import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  subject: any;

constructor(private http: HttpClient) { }

public crearJuego(body: any){
  return this.http.post('http://localhost:8080/juego/crear/',{...body})
}

conectar(juegoId:string){
  this.subject = webSocket('ws://localhost:8081/retrieve/'+juegoId);
  return this.subject;
}

close(){
  this.subject.unsubscribe();
}

}
