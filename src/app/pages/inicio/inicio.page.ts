import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public appPages = [
    { title: 'Avaliações', url: '../avaliacao', icon: 'document', color:"dark" }
  ];

  constructor() { }

  ngOnInit() {
  }
}


