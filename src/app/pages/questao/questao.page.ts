import { Component, OnInit } from '@angular/core';

import { Avaliacao } from 'src/app/models/avaliacao';
import { GrupoQuestao } from 'src/app/models/grupo-questao';
import { QuestaoElegivel } from 'src/app/models/questao-elegivel';
import { QuestaoSorteada } from 'src/app/models/questao-sorteada';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { GrupoQuestaoService } from 'src/app/services/grupo-questao.service';
import { QuestaoElegivelService } from 'src/app/services/questao-elegivel.service';
import { QuestaoSorteadaService } from 'src/app/services/questao-sorteada.service';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-questao',
  templateUrl: './questao.page.html',
  styleUrls: ['./questao.page.scss'],
})

export class QuestaoPage implements OnInit {

  public formGroup: FormGroup;
  
  tipoConhecimento: string;

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

  grupoQuestao = {
    idGrupoQuestao:null,
    nomeGrupo: null,
    pontoPorQuestao: null,
    quantidadeParaSortear:null,
  }
  grupoQuestaos: any = [];

  questaoElegivel = {
    grupoQuestaosId: null,
    idQuestaoElegivel:null,
    numeroParteFixo: null,
    tipoConhecimento: null,
    sentidoIdentificacao: null,
  }
  questaoElegivels: any = [];
  
  questaoSorteada = {
    idQuestaoSorteada: null,
    numeroParteSorteada: null,
    comentarioProfessor: null,
    notaCorrecao: null,
    tempoGasto: null,
    respostaNumeroParte: null,
    respostaNome: null,
    respostaConhecimento: null,
    matriculaAluno:null,
    questaoElegivels: null,
    idAvaliacao:null,
  }
  questaoSorteadas: any = [];
  questaoSorteadas2: any = [];
  questoes: any = [];

  numeroQuestao: number;

  questaoAtual: QuestaoElegivel;

  constructor(public alertController: AlertController, public toastController: ToastController, private avaliacaoService: AvaliacaoService,  private grupoQuestaoService: GrupoQuestaoService, private questaoElegivelService: QuestaoElegivelService, private questaoSorteadaService: QuestaoSorteadaService, private formBuilder: FormBuilder ) { 
    this.formGroup = this.formBuilder.group({
      'questao.':['', Validators.compose([
        Validators.required,
      ])]
    })
  }

  ngOnInit() {

    if(this.numeroQuestao == null){
      this.numeroQuestao = 0;
    }    

    this.carregarQuestao();
    

  }

  async carregarQuestao(){

    //pega as questoes elegiveis
    await this.questaoElegivelService.listar()
    .then ( json => {
      this.questaoElegivels = <QuestaoElegivel[]>(json);
       //pega os grupos de questoes
      this.grupoQuestaoService.listar()
      .then ( json => {
        this.grupoQuestaos = <GrupoQuestao[]>(json);
        //precisamos separar as questoes por grupo e sortea-las
        //for para pegar apenas as questoes elegiveis pertencentes a um mesmo grupo
        //primeiro laco de repeticao para percorrer o vetor de grupo de questoes
        for(let x = 0; x < this.grupoQuestaos.length; x++){
          let contador = 0;
          let questoesASortear: any = [];

          //segundo laco de repeticao para percorrer o veto de questoes elegiveis
          for(let c = 0; c < this.questaoElegivels.length; c++){

            // compara se o id do grupo de questoes com o do vetor para pegar apenas as questoes do mesmo grupo
            if(this.questaoElegivels[c].grupoQuestaos.idGrupoQuestao == this.grupoQuestaos[x].idGrupoQuestao){

              let questao = new QuestaoSorteada();
              //pego uma questao sorteada e guardo o id da questao elegivel referente
              questao.questaoElegivels = this.questaoElegivels[c].idQuestaoElegivel;

              //guarda a questao sorteada no vetor de questoes sorteadas que será usado posteriormente
              questoesASortear[contador] = questao;
              contador++;
              
              //reinicia valores para serem recebidos depois
            }
          }
            //apos pegar as questoes que serao sorteadas é realizado o sorteio entre elas
            // for que realiza o sorteio dos indices de acordo com numero indicado pelo grupo
            //se nao houver nenhuma questao elegivel na posicao 0, o programa entrara em loop
            //so executa se houverem questoes a serem sorteadas
            if(questoesASortear != null){
              for(let c = 0; c < this.grupoQuestaos[x].quantidadeParaSortear; c++ ){

                //enquanto nao houver nenhuma questao sorteada no vetor
                while(this.questaoSorteadas2[c] == null){
                  // define o minimo do sorteio
                let min = Math.ceil(0);
  
                //define o maximo do sorteio
                let max = Math.floor(questoesASortear.length);
                
                let sorteado = Math.floor(Math.random() * (max - min + 1)) + min;
                
                //repete o sorteio caso a questao ja tenha sido sorteada
                while(questoesASortear[sorteado] == null){
                  min = Math.ceil(0);
                  max = Math.floor(questoesASortear.length);
                  sorteado = Math.floor(Math.random() * (max - min + 1)) + min;
                  
                }
                //um vetor de questoes sorteada é preenchido
                this.questaoSorteadas2[c] = questoesASortear[sorteado];
                questoesASortear[sorteado] = null;
                }
              }
              
              //colocar todas as questoes sorteadas em um vetor
              if(this.questaoSorteadas2!=null){
                let y = this.questaoSorteadas2.length + this.grupoQuestaos[x].quantidadeParaSortear
                let cont = 0;
                for(let c = 0; c < y; c++){
                  // enquanto houver uma questao cadastrada no vetor de sorteadas, o contador sobe 
                  while(this.questaoSorteadas[c] != null){
                    c++;
                  }
                  if(this.questaoSorteadas2[cont]!=null){
                    this.questaoSorteadas[c] = this.questaoSorteadas2[cont];
                    this.questaoSorteadas2[cont] = null;
                    cont++;
                  }
                }
              }
            }
          }

        //realizar o sorteio entre as questoes que irao para a prova
        for(let c = 0; c < this.questaoSorteadas.length; c++){
          while(this.questoes[c] == null){
            let min = Math.ceil(0);
            let max = Math.floor(this.questaoSorteadas.length);
            let sorteado = Math.floor(Math.random() * (max - min + 1)) + min;

            if(this.questaoSorteadas[sorteado]!=null){
              this.questoes[c] = this.questaoSorteadas[sorteado]
              this.questaoSorteadas[sorteado]=null;
              this.questoes[c].idQuestaoSorteada = c;
            }
          }

        }

        //salvar no banco de dados as questoes sorteadas
        for(let c = 0;c < this.questoes.length; c++){
          //iniciar atributos para nao dar erro no banco de dados
          let questaoBanco = new QuestaoSorteada();
          questaoBanco.numeroParteSorteada = 0;
          questaoBanco.notaCorrecao = 0;
          questaoBanco.tempoGasto = '';
          questaoBanco.questaoElegivels = this.questoes[c].questaoElegivels;

          this.questaoSorteadaService.salvar(questaoBanco);
        }

        //pega as informacoes que irao aparecer na pagina
        this.questaoElegivelService.buscarPorId(this.questoes[1].questaoElegivels)
        .then ( json => {
          this.questaoAtual[1] = <QuestaoElegivel>(json);
          
          this.tipoConhecimento = this.questaoAtual.tipoConhecimento;
          
        })
      })
    })
  }

  async ionViewWillEnter(){
    
  }

}
