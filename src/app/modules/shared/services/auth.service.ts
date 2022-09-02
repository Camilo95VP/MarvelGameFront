import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { UserGoogle } from '../models/user.google.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(usuario => {
      this.user = usuario;
    })
  }

  logout(): void{
    this.afAuth.signOut().then((_res) => {
      this.ngZone.run(() => {
        this.router.navigate([''])
      })
    });
  }

  OAuthProvider(provider: any){
    return this.afAuth.signInWithPopup(provider)
    .then((_res) => {
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      })
    }).catch((err) => {
      window.alert(err)
    })
  }

  SinginWhitGoogle() {
    return this.OAuthProvider(new GoogleAuthProvider())
    .then(res => {
      console.log("logueo exitoso!")
    }).catch(err => {
      console.log(err)
    })
  }



}
