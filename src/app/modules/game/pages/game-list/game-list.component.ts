import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { WebsocketService } from 'src/app/modules/shared/services/websocket.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  juegos: any = [] 

  constructor(
    private router: Router, 
    private api$: ApiService,
    private ws$: WebsocketService) { }

  ngOnInit(): void {
    this.api$.getJuegos().subscribe({
      next: (data) => {
        this.juegos = data
      }
    })
  }

  iniciarJuego(juegoId: string) {
    this.api$.iniciarJuego({ juegoId: juegoId }).subscribe({
      next: () => {
        console.log('JUEGO INICIADO DESDE LA LISTA');
      },
      complete: () => {
        this.router.navigate([`/dashboard/${juegoId}`]);
      },
    });
  }
  // botonClickDashboard() {
  //   this.router.navigate(['dashboard']);
  // }

}
