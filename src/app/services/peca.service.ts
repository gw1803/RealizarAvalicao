import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Peca } from '../models/peca';

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  urlServidor: string = "http://localhost:8080/pecas/";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  async salvar(peca: Peca){
    if(peca.idPeca == null){
      try{
        let json = await this.httpClient.post(this.urlServidor, JSON.stringify(peca), this.httpOptions).toPromise();
        return json;
      }catch(erro){
        return erro;
      }
    } else{
      try{
        let json = await this.httpClient.put(this.urlServidor, JSON.stringify(peca), this.httpOptions).toPromise();
        return json;
      } catch(erro){
        return erro;
      }
    }
  }

  async excluir(peca: Peca){
    console.log(1)
    let urlAuxiliar = this.urlServidor + peca.idPeca
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

  async buscarPorId(idPeca: number){
    let urlAuxiliar = this.urlServidor + idPeca
    try{
      let json = await this.httpClient.get(urlAuxiliar).toPromise();
      return json;
    } catch(erro){
      return erro;
    }
  }
}
