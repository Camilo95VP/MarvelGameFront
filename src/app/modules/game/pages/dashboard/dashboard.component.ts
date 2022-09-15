import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carta } from 'src/app/modules/shared/models/mazo.model';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { WebsocketService } from 'src/app/modules/shared/services/websocket.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  juegoId: string = "";
  uid: string = "";
  tiempo: number = 0;
  jugadoresRonda: number = 0;
  jugadoresTablero: number = 0;
  numeroRonda: number = 0;
  rondaIniciada: boolean = false;
  cartasDelJugador: Carta[] = [];
  cartasDelTablero: Carta[] = [];
  ganadorRonda: string = "";
  perdedorRonda: string = "";
  ganadorJuego: string = "";

  constructor(
    private api$: ApiService,
    private ws$: WebsocketService,
    public auth$: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    //OBTENER ID
    this.route.params.subscribe((params) => {
      this.juegoId = params['id'];
      console.log("ID DEL JUEGO = ", this.juegoId)
      this.uid = this.auth$.user.uid;

      //OBTENER MAZO
      this.api$.getMazo(this.uid, this.juegoId).subscribe((element: any) => {
        this.cartasDelJugador = element.cartas;
        console.log("CARTAS JUGADOR", this.cartasDelJugador)
      });

      //OBTENER TABLERO
      this.api$.getTablero(this.juegoId).subscribe((element: any) => {
        console.log("TABLERO = ", element)
        this.cartasDelTablero = Object.entries(element.tablero.cartas).flatMap((a: any) => {
          return a[1];
        });
        console.log("CARTAS DEL TABLERO =", this.cartasDelTablero)
        this.tiempo = element.tiempo;
        this.jugadoresRonda = element.ronda.jugadores.length;
        this.jugadoresTablero = element.tablero.jugadores.length;
        this.numeroRonda = element.ronda.numero;
      })
      //CONECTAR WEBSOCKET
      this.ws$.conectar(this.juegoId).subscribe({

        next: (event: any) => {
          console.log(event)
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
              .filter((item) => item.cartaId !== event.carta.cartaId.uuid);
          }
          if (event.type === 'cardgame.tiempocambiadodeltablero') {
            this.tiempo = event.tiempo;
          }
          if(event.type === 'cardgame.rondacreada'){
            this.numeroRonda = event.ronda.numero;
          }
          if (event.type === 'cardgame.rondainiciada') {
            this.cartasDelJugador = this.cartasDelJugador;
            this.ganadorRonda = ""
            this.perdedorRonda = ""
            this.rondaIniciada = true;
          }
          if (event.type === 'cardgame.rondaterminada') {
            this.cartasDelTablero = []
            this.rondaIniciada = false;
          }
          if(event.type === 'cardgame.cartasasignadasajugador'){
            if(event.ganadorId.uuid === this.uid){
              event.cartasApuesta.forEach((carta: any) => {
                this.cartasDelJugador.push({
                  cartaId: carta.cartaId.uuid,
                  poder: carta.poder,
                  estaOculta: carta.estaOculta,
                  estaHabilitada: carta.estaHabilitada,
                  url: carta.url
                });
              });
              this.ganadorRonda = "GANASTE LA RONDA !"
            }else{
              this.perdedorRonda = "PERDISTE LA RONDA"
           }
          }
          
          if(event.type === 'cardgame.juegofinalizado'){
            swal.fire('Ganador del juego', event.alias);
            this.router.navigate(['game/list']);
          }


          
        },
        error: (err: any) => console.log(err),
        complete: () => console.log('complete')
      });
    });
  }

  limpiarTablero(){
    this.cartasDelTablero.length-=this.cartasDelTablero.length
  }

  poner(cartaId: string) {
    this.api$.ponerCarta({
      cartaId: cartaId,
      juegoId: this.juegoId,
      jugadorId: this.uid
    }).subscribe();
  }

  iniciarRonda() {
    this.api$.iniciarRonda({
      juegoId: this.juegoId,
    }).subscribe();
  }

}
