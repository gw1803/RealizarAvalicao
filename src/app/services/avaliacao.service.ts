import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Avaliacao } from '../models/avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  urlServidor: string = "http://localhost:8080/avaliacoes/";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  async salvar(avaliacao: Avaliacao){
    if(avaliacao.idAvaliacao == null){
      try{
        let json = await this.httpClient.post(this.urlServidor, JSON.stringify(avaliacao), this.httpOptions).toPromise();
        return json;
      }catch(erro){
        return erro;
      }
    } else{
      try{
        let json = await this.httpClient.put(this.urlServidor, JSON.stringify(avaliacao), this.httpOptions).toPromise();
        return json;
      } catch(erro){
        return erro;
      }
    }
  }

  async excluir(avaliacao: Avaliacao){
    console.log(1)
    let urlAuxiliar = this.urlServidor + avaliacao.idAvaliacao
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

  async buscarPorId(idAvaliacao: number){
    let urlAuxiliar = this.urlServidor + idAvaliacao
    try{
      let json = await this.httpClient.get(urlAuxiliar).toPromise();
      return json;
    } catch(erro){
      return erro;
    }
  }
}
