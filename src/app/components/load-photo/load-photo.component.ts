import { Component } from '@angular/core';

import FileItem from '../../models/FileItem';
import { FirebaseStorageService } from '../../services/firebase-storage.service';

@Component({
  selector: 'app-load-photo',
  templateUrl: './load-photo.component.html',
  styles: []
})
export class LoadPhotoComponent {

  files: FileItem[] = [];
  isOnDrop: boolean = false;

  constructor(private _firebaseStorage: FirebaseStorageService) { }

  uploadImages(): void {
    this._firebaseStorage.uploadImagesFirebase(this.files);
  }

  cleanFiles(): void {
    this.files = [];
  }

}
