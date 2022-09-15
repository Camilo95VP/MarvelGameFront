import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { WebsocketService } from 'src/app/modules/shared/services/websocket.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {
  juegos: any = []
  mensaje: string = "";

  constructor(
    private router: Router, 
    private api$: ApiService,
    private ws$: WebsocketService) { }
    
    ngOnDestroy(): void {
      this.ws$.close();
    }

  ngOnInit(): void {
    this.api$.getJuegos().subscribe({
      next: (data) => {
        this.juegos = data
      }
    })

    if(this.juegos.isEmpty()) {
      this.mensaje = "No existen juegos creados"
    }
  }

  iniciarJuego(juegoId: string) {
    this.ws$.conectar(juegoId).subscribe({
      next: (event:any) => {
        if(event.type === 'cardgame.tablerocreado'){         
          this.api$.crearRonda({
              juegoId: juegoId,
              tiempo: 80,
              jugadores: event.jugadorIds.map((it:any) => it.uuid) 
          });
          console.log("creando tablero ...")
        }

        if(event.type == 'cardgame.rondacreada'){
          this.router.navigate(['dashboard/'+juegoId]); 
          console.log("creando ronda ...")
        }
        
      },
      error: (err:any) => console.log(err),
      complete: () => console.log('complete desde list-games .')
    });
    this.api$.iniciarJuego({ juegoId: juegoId }).subscribe();
    console.log("iniciando juego ...")
  }
  }
  // botonClickDashboard() {
  //   this.router.navigate(['dashboard']);
  // }

