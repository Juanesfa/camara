import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  cameraService: CameraService = inject(CameraService);
  imgUrl: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  async takePicture() {
    this.errorMessage = ''; // Limpiar mensajes de error anteriores

    try {
      this.loading = true;
      this.imgUrl = await this.cameraService.takePicture();
      if (!this.imgUrl) {
        throw new Error('No se obtuvo una imagen válida');
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      this.loading = false;
      this.triggerAnimations();
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = String(error);
      this.imgUrl = '';
      this.loading = false;
    }
  }

  triggerAnimations() {
    const light = document.getElementById('circle');
    const eject = document.getElementById('photo');

    if (light && eject) {
      light.classList.remove('flash-animation');
      eject.classList.remove('eject-photo');

      setTimeout(() => {
        light.classList.add('flash-animation');
        eject.classList.add('eject-photo');
      }, 100);
    }
  }
}