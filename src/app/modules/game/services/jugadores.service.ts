import { Injectable } from '@angular/core';
import firebase from 'firebase/compat'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Usuario } from '../../game/models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private usersCollection: AngularFirestoreCollection<Usuario>;
  constructor(private storage: AngularFirestore, private http: HttpClient) {
    this.usersCollection = storage.collection<Usuario>('usuarios');
  }

  game(gamers: Array<string>): Observable<Game> {
    return this.http.post<Game>(`${environment.urlBackend}/game`, { gamers }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getJugadores(): Promise<Array<Usuario>> {
    const result = await new Promise<Usuario[]>((resolve, reject) => {
      const query = this.usersCollection;
      query.get().subscribe({
        next: (data) => {
          const usuarios = new Array<Usuario>();
          data.forEach((gamer) => {
            usuarios.push(gamer.data());
          });
          resolve(usuarios);
        },
        error: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
    return result;


  }

  public addGamer(user: firebase.User | null): void {
    if (user != null) {
      const newUser = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL
      } as Usuario;
      this.usersCollection
        .doc(user.uid)
        .set(newUser)
        .then(() => console.log("Jugador registrado"))
    }
  }
}
