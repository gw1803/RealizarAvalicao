import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Parte } from '../models/parte';

@Injectable({
  providedIn: 'root'
})
export class ParteService {

  urlServidor: string = "http://localhost:8080/partes/";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  async salvar(parte: Parte){
    if(parte.idParte == null){
      try{
        let json = await this.httpClient.post(this.urlServidor, JSON.stringify(parte), this.httpOptions).toPromise();
        return json;
      }catch(erro){
        return erro;
      }
    } else{
      try{
        let json = await this.httpClient.put(this.urlServidor, JSON.stringify(parte), this.httpOptions).toPromise();
        return json;
      } catch(erro){
        return erro;
      }
    }
  }

  async excluir(parte: Parte){
    console.log(1)
    let urlAuxiliar = this.urlServidor + parte.idParte
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

  async buscarPorId(idParte: number){
    let urlAuxiliar = this.urlServidor + idParte
    try{
      let json = await this.httpClient.get(urlAuxiliar).toPromise();
      return json;
    } catch(erro){
      return erro;
    }
  }
}
