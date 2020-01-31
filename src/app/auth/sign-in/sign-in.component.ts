import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseStorageService } from '../../services/firebase-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: []
})
export class SignInComponent {

  form: FormGroup;

  private emailValidate: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private regEx = new RegExp(this.emailValidate);

  constructor(
    private router: Router,
    private _firebaseStorage: FirebaseStorageService
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.regEx)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  onSignIn(f: FormGroup): void {
    if (f.invalid) return;
    this._firebaseStorage.signIn(this.form.value.email, this.form.value.password);
  }

}
