import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PhotosComponent } from './photos/photos.component';
import { LoadPhotoComponent } from './load-photo/load-photo.component';
import { NavComponent } from './shared/nav/nav.component';
import { ComponentsComponent } from './components.component';

import { NgDropFilesDirective } from '../directives/ng-drop-files.directive';
import { NoPageComponent } from './shared/no-page/no-page.component';

@NgModule({
  declarations: [
    PhotosComponent,
    LoadPhotoComponent,
    NavComponent,
    ComponentsComponent,
    NgDropFilesDirective,
    NoPageComponent
  ],
  exports: [
    PhotosComponent,
    LoadPhotoComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
