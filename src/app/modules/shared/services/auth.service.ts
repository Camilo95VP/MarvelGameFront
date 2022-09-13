import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { JugadoresService } from '../../game/services/jugadores.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private ngZone: NgZone,
    private gamers$: JugadoresService
  ) {  
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get user() {
    if (this.isLoggedIn) {
      return JSON.parse(localStorage.getItem('user')!);
    }
    throw new Error("No found uid");
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  async getUserAuth() {
    const userData = await this.afAuth.currentUser;
    return userData;
  }

  SinginWhitGoogle(): Promise<void> {
    return this.OAuthProvider(new GoogleAuthProvider())
    .then(res => {
      console.log("logueo exitoso!")
    }).catch(err => {
      console.log(err)
    })
  }

  OAuthProvider(provider: AuthProvider){
    return this.afAuth.signInWithPopup(provider)
    .then((_res) => {
      this.gamers$.addGamer(_res.user);
      this.ngZone.run(() => {
        this.router.navigate(['home']); 
      })
    }).catch((err) => {
      window.alert(err)
    })
  }

  logout(): void{
    this.afAuth.signOut().then((_res) => {
      this.ngZone.run(() => {
        this.router.navigate([''])
      })
    });
  }

}
