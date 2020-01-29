import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosComponent } from './components/photos/photos.component';
import { LoadPhotoComponent } from './components/load-photo/load-photo.component';


const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'load-photos', component: LoadPhotoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'photos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
