import { Component, OnInit } from '@angular/core';
import { PecaService } from 'src/app/services/peca.service';
import { Peca} from 'src/app/models/peca';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.page.html',
  styleUrls: ['./selecao.page.scss'],
})
export class SelecaoPage implements OnInit {
  pecas: Peca[];

  constructor( public pecaService: PecaService) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.pecaService.listar()
    .then ( json => {
      this.pecas = <Peca[]>(json);
    });
  }
 }
   
