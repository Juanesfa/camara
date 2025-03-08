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
  showSuccessMessage: boolean = false; // Nueva variable para controlar el mensaje

  async takePicture() {
    this.errorMessage = ''; // Limpiar mensajes de error anteriores
    this.showSuccessMessage = false; // Ocultar mensaje de éxito anterior

    try {
      this.loading = true;
      this.imgUrl = await this.cameraService.takePicture();
      if (!this.imgUrl) {
        throw new Error('No se obtuvo una imagen válida');
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      this.loading = false;

      // Mostrar mensaje de éxito
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false; // Ocultar el mensaje después de 3 segundos
      }, 3000);
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = String(error);
      this.imgUrl = '';
      this.loading = false;
    }
  }
}