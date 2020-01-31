import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosComponent } from './components/photos/photos.component';
import { LoadPhotoComponent } from './components/load-photo/load-photo.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ComponentsComponent } from './components/components.component';

import { AuthGuard } from './guards/auth.guard';
import { NoPageComponent } from './components/shared/no-page/no-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard] },
      { path: 'load-photos', component: LoadPhotoComponent, canActivate: [AuthGuard] },
      { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
      { path: '***', pathMatch: 'full', redirectTo: '404' }
    ]
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '404', component: NoPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path: '***', pathMatch: 'full', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
