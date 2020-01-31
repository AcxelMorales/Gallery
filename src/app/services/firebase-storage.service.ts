import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import Swal from 'sweetalert2';

import FileItem from '../models/FileItem';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  private IMG_FOLDER = 'img';
  public email: string;

  constructor(
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private route: Router
  ) { }

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

  signUp(email: string, password: string): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `User with email ${email} was created`,
          showConfirmButton: false,
          timer: 1500
        });

        this.route.navigate(['/sign-in']);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }

  signIn(email: string, password: string): void {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.email = data.user.email;
        this.route.navigate(['/photos']);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }

  async logOut(): Promise<void> {
    await this.afAuth.auth.signOut();
    this.route.navigate(['/sign-in']);
  }

}
