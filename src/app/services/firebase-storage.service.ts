import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

import FileItem from '../models/FileItem';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  private IMG_FOLDER = 'img';

  constructor(private db: AngularFirestore) { }

  uploadImagesFirebase(images: FileItem[]): void {
    const storageRef = firebase.storage().ref();

    for (const item of images) {
      item.isLoading = true;

      if (item.progress >= 100) continue;

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.IMG_FOLDER}/${item.fileName}`).put(item.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (err) => console.error('Upload error', err),
        () => {
          // item.url = uploadTask.snapshot.downloadURL;
          // item.isLoading = false;

          // this.saveImg({
          //   name: item.fileName,
          //   url : item.url
          // });

          uploadTask.snapshot.ref.getDownloadURL()
            .then((url) => {
              item.url = url;
              item.isLoading = false;

              this.saveImg({
                name: item.fileName,
                url: item.url
            });
          });
        }
      );
    }
  }

  private saveImg(image: { name: string, url: string }): void {
    this.db.collection(`/${this.IMG_FOLDER}`).add(image);
  }

}
