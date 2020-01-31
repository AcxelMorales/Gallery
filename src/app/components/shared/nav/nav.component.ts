import { Component, OnInit } from '@angular/core';

import { FirebaseStorageService } from '../../../services/firebase-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  constructor(private _firebaseStorage: FirebaseStorageService) { }

  ngOnInit() {
  }

  onLogOut(): void {
    this._firebaseStorage.logOut();
  }

}
