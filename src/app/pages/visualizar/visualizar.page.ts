import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Avaliacao } from 'src/app/models/avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  id: string;
  avaliacao = {
    idAvaliacao: null,
    tituloAvaliacao: null,
    subtituloAvaliacao: null,
    nomeProfessor: null,
    valorTotal: null,
    tempo: null,
    instrucoes: null,
    numeroTentativas: null
  }
  avaliacaos: any = [];

  constructor(private activatedRoute: ActivatedRoute, private avaliacaoService: AvaliacaoService ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('idAvaliacao');    

    if(this.id != null){
      this.avaliacaoService.buscarPorId(parseInt(this.id))
      .then ( json => {
        this.avaliacao = <Avaliacao>(json);
      })
    }
  }

}
