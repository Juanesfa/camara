import { Routes } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
  { path: 'camera', component: CameraComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', redirectTo: '/camera', pathMatch: 'full' }
];