import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosComponent } from './components/photos/photos.component';
import { LoadPhotoComponent } from './components/load-photo/load-photo.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ComponentsComponent } from './components/components.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      { path: 'photos', component: PhotosComponent },
      { path: 'load-photos', component: LoadPhotoComponent },
      { path: '', redirectTo: '/photos', pathMatch: 'full' }
    ]
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'photos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
