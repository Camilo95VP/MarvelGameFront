import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUser!: firebase.User | null;
  nombre!: string | null | undefined;

  constructor(private auth$: AuthService) { }

  async ngOnInit() {
    this.currentUser = await this.auth$.getUserAuth();
    this.nombre = this.currentUser?.displayName
  }

  botonLogout(): void {
    this.auth$.logout();
  }

}
