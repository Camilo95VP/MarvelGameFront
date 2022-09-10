import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearJuegoCommand } from '../commands/crearJuegoCommand';
import { JuegoModel } from '../models/juego.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, public afs: AngularFirestore){}

  crearJuego(command: CrearJuegoCommand) {
    return this.http.post(environment.urlBackend + '/juego/crear', command);
  }

  getMisJuegos(): Observable<JuegoModel[]> {
    return this.http.get<JuegoModel[]>(environment.urlBackend + '/juegos/');
   }

}
