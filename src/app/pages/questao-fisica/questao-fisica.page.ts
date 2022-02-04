import { Component, DebugNode, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParteService}  from 'src/app/services/parte.service';
import {PecaService}  from 'src/app/services/peca.service';
import {QuestaoSorteadaService}  from 'src/app/services/questao-sorteada.service';
import { Parte } from 'src/app/models/parte';
import { Peca } from 'src/app/models/peca';
import { QuestaoSorteada } from 'src/app/models/questao-sorteada';

@Component({
  selector: 'app-questao-fisica',
  templateUrl: './questao-fisica.page.html',
  styleUrls: ['./questao-fisica.page.scss'],
})

export class QuestaoFisicaPage implements OnInit {
  parte: Parte;
  peca: Peca;
  formGroup: FormGroup;
  questao: QuestaoSorteada;
  questoes: QuestaoSorteada[];

  partes: Parte[];
  pecas: Peca[];
  contador: number = 0;


  constructor( private activatedRoute: ActivatedRoute, public toastController: ToastController, private parteService: ParteService, private pecaService: PecaService, private questaoSorteadaService: QuestaoSorteadaService, private formBuilder: FormBuilder) { 
    this.formGroup = this.formBuilder.group({
      'nome':['', Validators.compose([
        Validators.required,
      ])],
      'nomeParte':['', Validators.compose([
        Validators.required,
      ])],
      'resposta':['', Validators.compose([
        Validators.required,
      ])]
    })
  }
 
  ngOnInit(){
    this.parte = new Parte();
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.parteService.listar()
    .then ( json => {
      this.partes = <Parte[]>(json);
          this.pecaService.buscarPorId(this.partes[this.contador].idPeca)
          .then( json => {
            this.peca = <Peca>(json); 
            this.formGroup.get('nome').setValue(this.peca.nomePeca);
          })
          this.formGroup.get('nomeParte').setValue(this.partes[this.contador].nome);
          this.contador++;
    })
  }
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async submitForm(){    
    let questao = new QuestaoSorteada;

    questao.respostaNome = this.formGroup.value.resposta;
    questao.tempoGasto = '0';

    this.questaoSorteadaService.salvar(questao)
    .then( json => {  
      this.partes[this.contador] == null;
      this.parteService.listar()
      .then ( json => {
        this.partes = <Parte[]>(json);
        if(this.contador<this.partes.length){
          this.pecaService.buscarPorId(this.partes[this.contador].idPeca)
          .then( json => {
            this.peca = <Peca>(json); 
            this.formGroup.get('nome').setValue(this.peca.nomePeca);
          })
          this.formGroup.get('nomeParte').setValue(this.partes[this.contador].nome);
          this.formGroup.get('resposta').setValue('');
          this.partes[this.contador] = null;
          this.contador ++;
        } else{
          this.formGroup.get('resposta').setValue('Você terminou a prova!');
        }
      })
    })
  }
  

}

