import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private ngZone: NgZone,
    private gamers$: JugadoresService
  ) {  }

  logout(): void{
    this.afAuth.signOut().then((_res) => {
      this.ngZone.run(() => {
        this.router.navigate([''])
      })
    });
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

}
