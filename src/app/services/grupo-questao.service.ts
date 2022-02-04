import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GrupoQuestao } from '../models/grupo-questao';

@Injectable({
  providedIn: 'root'
})
export class GrupoQuestaoService {

  urlServidor: string = "http://localhost:8080/grupoQuestaos/";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  async salvar(grupoQuestao: GrupoQuestao){
    if(grupoQuestao.idGrupoQuestao == null){
      try{
        let json = await this.httpClient.post(this.urlServidor, JSON.stringify(grupoQuestao), this.httpOptions).toPromise();
        return json;
      }catch(erro){
        return erro;
      }
    } else{
      try{
        let json = await this.httpClient.put(this.urlServidor, JSON.stringify(grupoQuestao), this.httpOptions).toPromise();
        return json;
      } catch(erro){
        return erro;
      }
    }
  }

  async excluir(grupoQuestao: GrupoQuestao){
    console.log(1)
    let urlAuxiliar = this.urlServidor + grupoQuestao.idGrupoQuestao
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

  async buscarPorId(idGrupoQuestao: number){
    let urlAuxiliar = this.urlServidor + idGrupoQuestao
    try{
      let json = await this.httpClient.get(urlAuxiliar).toPromise();
      return json;
    } catch(erro){
      return erro;
    }
  }
}
