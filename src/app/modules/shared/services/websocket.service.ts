import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocketSubject<unknown>;

constructor(private http: HttpClient) { }

public crearJuego(body: any){
  debugger
  return this.http.post('http://localhost:8080/juego/crear/',{...body})
}

conectar(juegoId:string){
  this.socket = webSocket(`${environment.urlWs}/${juegoId}`);
  return this.socket;
}

close(){
  this.socket.unsubscribe();
}

}
