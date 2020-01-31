import { Component } from '@angular/core';

import { FirebaseStorageService } from '../../../services/firebase-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent {

  constructor(private _firebaseStorage: FirebaseStorageService) { }

  onLogOut(): void {
    this._firebaseStorage.logOut();
  }

}
