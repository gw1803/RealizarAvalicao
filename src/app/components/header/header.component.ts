import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input("titulo")
  titulo: string = 'A definir';
  @Input("rota")
  rota: string = 'inicio';
  @Input("cor")
  cor: string = 'dark';

  constructor() { }

  ngOnInit() {}

}
