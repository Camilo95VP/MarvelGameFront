// Libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['home']);

// Components
import { HomeComponent } from './modules/game/pages/home/home.component';
import { LoginComponent } from './modules/game/pages/login/login.component';
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { NavComponent } from './modules/shared/components/nav/nav.component';
import { GameListComponent } from './modules/game/pages/game-list/game-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'game/new',
    component: NewGameComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'game/list',
    component: GameListComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'nav',
    component: NavComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
