import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/modules/shared/services/api.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  juegos: any = [] 

  constructor(private router: Router, private api$: ApiService) { }

  ngOnInit(): void {
    this.api$.getMisJuegos().subscribe({
      next: (data) => {
        this.juegos = data
      }
    })
  }

  botonClickDashboard() {
    this.router.navigate(['dashboard']);
  }

}
