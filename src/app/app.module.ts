// Libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth'

// Routers
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './templates/cards/app.component';

// Components
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { LoginComponent } from './modules/game/pages/login/login.component';
import { HomeComponent } from './modules/game/pages/home/home.component';

//enviroments
import { environment } from 'src/environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import { GameListComponent } from './modules/game/pages/game-list/game-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewGameComponent,
    HomeComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
