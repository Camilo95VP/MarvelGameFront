import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { JugadoresService } from '../../services/jugadores.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import firebase from 'firebase/compat';
import { Game } from '../../models/game.model';


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  frmJugadores: FormGroup;
  jugadores!: Array<Usuario>;
  currentUser!: firebase.User | null;
  
  constructor(private jugadores$: JugadoresService, private auth$: AuthService, private router: Router) {
    this.frmJugadores = this.createFormJugadores();
  }

  async ngOnInit(): Promise<void> {
    this.jugadores = await this.jugadores$.getJugadores();
    console.log(this.jugadores);
    this.currentUser = await this.auth$.getUserAuth();
    console.log("current",this.currentUser?.displayName)
    this.jugadores = this.jugadores.filter(item => item.id !== this.currentUser?.uid);
  }

  public submit(): void {
    this.router.navigate(['game/list']);
    const gamers = this.frmJugadores.getRawValue();
    gamers.jugadores.push(this.currentUser?.uid);
    console.log("Submit", gamers);
    this.jugadores$.game(gamers).subscribe({
      next: (data: Game) => {
        // informacion que llega desde el back
        console.log("Game", data);
      },
      error: (err: any) => console.log(err),
      complete: ()=> {
        console.log("Completado")
      }
    });
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }


}
