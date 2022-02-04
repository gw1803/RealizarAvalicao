import { Component, OnInit } from '@angular/core';

import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { Avaliacao } from 'src/app/models/avaliacao';

import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})

export class AvaliacaoPage implements OnInit {
  avaliacaos: Avaliacao[];

  constructor(public alertController: AlertController, public toastController: ToastController, public avaliacaoService: AvaliacaoService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.avaliacaoService.listar()
    .then(json => {
      this.avaliacaos = <Avaliacao[]>(json);
    });
  }

  async excluirAvaliacao(idAvaliacao: number){
    let avaliacao: Avaliacao;
    this.avaliacaoService.buscarPorId(idAvaliacao)
    .then(json =>{
      avaliacao = <Avaliacao>(json);
      if(avaliacao){
        this.confirmarExclusao(avaliacao);
      }
    })
  }

  async confirmarExclusao(avaliacao: Avaliacao){
    const alert = await this.alertController.create({
      header:"Confirma a exclusão?",
      message: avaliacao.tituloAvaliacao,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text:'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.avaliacaoService.excluir(avaliacao)
            .then(json => {
              this.avaliacaoService.listar()
              .then(json => {
                this.avaliacaos = <Avaliacao[]>(json);
              });

              this.exibirMensagem('Registro excluído com sucesso!!!');
            })
            .catch(erro => {
              this.exibirMensagem('Erro ao excluir o resgistro');
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async exibirMensagem(texto: string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
