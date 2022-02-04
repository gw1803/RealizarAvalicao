import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { QuestaoSorteada } from '../models/questao-sorteada';

@Injectable({
  providedIn: 'root'
})
export class QuestaoSorteadaService {

  urlServidor: string = "http://localhost:8080/questaoSorteadas/";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  async salvar(questaoSorteada: QuestaoSorteada){
    if(questaoSorteada.idQuestaoSorteada == null){
      try{
        let json = await this.httpClient.post(this.urlServidor, JSON.stringify(questaoSorteada), this.httpOptions).toPromise();
        return json;
      }catch(erro){
        return erro;
      }
    } else{
      try{
        let json = await this.httpClient.put(this.urlServidor, JSON.stringify(questaoSorteada), this.httpOptions).toPromise();
        return json;
      } catch(erro){
        return erro;
      }
    }
  }

  async excluir(questaoSorteada: QuestaoSorteada){
    console.log(1)
    let urlAuxiliar = this.urlServidor + questaoSorteada.idQuestaoSorteada
    try{
      return await this.httpClient.delete(urlAuxiliar).toPromise();
    } catch(erro){
      return false;
    }
  }

  async listar(){
    try{
      let json = await this.httpClient.get(this.urlServidor).toPromise();
      return json;
    } catch(erro){
      return erro;
    }
  }

  async buscarPorId(idQuestaoSorteada: number){
    let urlAuxiliar = this.urlServidor + idQuestaoSorteada
    try{
      let json = await this.httpClient.get(urlAuxiliar).toPromise();
      return json;
    } catch(erro){
      return erro;
    }
  }
}
