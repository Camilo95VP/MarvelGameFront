import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth$: AuthService
  ) { }

  ngOnInit() {
  }
  
  botonLogin(): void {
      this.auth$.SinginWhitGoogle();
  }


}
