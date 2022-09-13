import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carta } from 'src/app/modules/shared/models/mazo.model';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { WebsocketService } from 'src/app/modules/shared/services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cartasDelJugador: Carta[] = [];
  cartasDelTablero: Carta[] = [];
  juegoId: string = "";
  uid: string = "";
  tiempo: number = 0;
  jugadoresRonda: number = 0;
  jugadoresTablero: number = 0;
  numeroRonda: number = 0;
  roundStarted:boolean = false;

  constructor(
    private api$: ApiService,
    private ws$: WebsocketService,
    public auth$: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    //OBTENER ID
    this.route.params.subscribe((params) => {
      this.juegoId = params['id'];
      console.log("ID DEL JUEGO = ", this.juegoId)
      this.uid = this.auth$.user.uid;
      this.api$.getMazo(this.uid, this.juegoId).subscribe((element:any) => {
        this.cartasDelJugador = element.cartas;
        console.log("CARTAS JUGADOR", this.cartasDelJugador)
      });

    //OBTENER TABLERO
    this.api$.getTablero(this.juegoId).subscribe((element:any) => {
      console.log("TABLERO = ",element)
      this.cartasDelTablero = Object.entries(element.tablero.cartas).flatMap((a: any) => {
        return a[1];
    });

    this.tiempo = element.tiempo;
    this.jugadoresRonda = element.ronda.jugadores.length;
    this.jugadoresTablero = element.tablero.jugadores.length;
    this.numeroRonda = element.ronda.numero;
  })
    //CONECTAR WEBSOCKET
    this.ws$.conectar(this.juegoId).subscribe({
      
        next: (event:any) => {
          if (event.type === 'cardgame.ponercartaentablero') {
            this.cartasDelTablero.push({
              cartaId: event.carta.cartaId.uuid,
              poder: event.carta.poder,
              estaOculta: event.carta.estaOculta,
              estaHabilitada: event.carta.estaHabilitada,
              url: event.carta.url,
            });
          }
          if (event.type === 'cardgame.cartaquitadadelmazo') {
            this.cartasDelJugador = this.cartasDelJugador
              .filter((item) => item.cartaId !==  event.carta.cartaId.uuid);
          }
          if (event.type === 'cardgame.tiempocambiadodeltablero') {
            this.tiempo = event.tiempo;
          }

          if(event.type === 'cardgame.rondainiciada'){
            this.roundStarted = true;
          }

          if(event.type === 'cargame.rondaterminada'){
            this.roundStarted = false;
          }
        },
        error: (err:any) => console.log(err),
        complete: () => console.log('complete')
    });
  });
}

  iniciarRonda(){
    this.api$.iniciarRonda({
      juegoId: this.juegoId,
    }).subscribe();
  }
  
}
