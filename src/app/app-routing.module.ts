// Libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/game/pages/home/home.component';

// Components
import { LoginComponent } from './modules/game/pages/login/login.component';
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';

const routes: Routes = [
  {
    path: 'game/new',
    component: NewGameComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
