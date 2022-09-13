import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearJuegoCommand } from '../commands/crearJuegoCommand';
import { CrearRondaCommand } from '../commands/crearRondaCommand';
import { IniciarJuegoCommand } from '../commands/iniciarJuegoCommand';
import { IniciarRondaCommand } from '../commands/iniciarRondaCommand';
import { JuegoModel } from '../models/juego.model';
import { TableroModel } from '../models/tablero.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, public afs: AngularFirestore) { }

  crearJuego(command: CrearJuegoCommand) {
    return this.http.post(environment.urlBackend + '/juego/crear', command);
  }

  iniciarJuego(command: IniciarJuegoCommand){
    return this.http.post(environment.urlBackend + '/juego/iniciar', command);
  }
  
  iniciarRonda(command: IniciarRondaCommand){
    return this.http.post(environment.urlBackend + '/juego/ronda/iniciar', command);
  }

  getJuegos(): Observable<JuegoModel[]> {
    return this.http.get<JuegoModel[]>(environment.urlBackend + '/juegos/');
  }

  getTablero(juegoId: string): Observable<TableroModel[]> {
    return this.http.get<TableroModel[]>(environment.urlBackend + '/juego/' + juegoId)
  }

  getMazo(uid: string, juegoId: string) {
    return this.http.get(environment.urlBackend + '/juego/mazo/'+uid+'/'+juegoId);
   }

  crearRonda(command: CrearRondaCommand){
    return this.http.post(environment.urlBackend + '/juego/crear/ronda', command);
  }

}
