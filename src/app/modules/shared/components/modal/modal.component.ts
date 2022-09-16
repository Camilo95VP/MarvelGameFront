import { Component, Input, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() prop: any[] = new Array<any>;
  jugadores: Array<string> = new Array<string>();

  constructor(private api$: ApiService) { }

  ngOnInit() {
    // this.jugadores = this.prop.filter(id => id !== getAuth().currentUser?.uid);
  }

  cerrar(){
    this.api$.mostraModal.emit(false)
  }
}
