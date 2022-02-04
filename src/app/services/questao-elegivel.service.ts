import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { QuestaoElegivel } from '../models/questao-elegivel';

@Injectable({
  providedIn: 'root'
})
export class QuestaoElegivelService {

  urlServidor: string = "http://localhost:8080/questaoElegivels/";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  async salvar(questaoElegivel: QuestaoElegivel){
    if(questaoElegivel.idQuestaoElegivel == null){
      try{
        let json = await this.httpClient.post(this.urlServidor, JSON.stringify(questaoElegivel), this.httpOptions).toPromise();
        return json;
      }catch(erro){
        return erro;
      }
    } else{
      try{
        let json = await this.httpClient.put(this.urlServidor, JSON.stringify(questaoElegivel), this.httpOptions).toPromise();
        return json;
      } catch(erro){
        return erro;
      }
    }
  }

  async excluir(questaoElegivel: QuestaoElegivel){
    console.log(1)
    let urlAuxiliar = this.urlServidor + questaoElegivel.idQuestaoElegivel
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

  async buscarPorId(idQuestaoElegivel: number){
    let urlAuxiliar = this.urlServidor + idQuestaoElegivel
    try{
      let json = await this.httpClient.get(urlAuxiliar).toPromise();
      return json;
    } catch(erro){
      return erro;
    }
  }


}
