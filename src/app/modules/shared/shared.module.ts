import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [NavComponent, FooterComponent, ModalComponent],
  imports: [
    CommonModule,
  ],
  exports: [NavComponent, FooterComponent, ModalComponent],
  
})
export class SharedModule { }
