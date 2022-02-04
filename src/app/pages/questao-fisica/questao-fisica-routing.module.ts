import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestaoFisicaPage } from './questao-fisica.page';

const routes: Routes = [
  {
    path: '',
    component: QuestaoFisicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestaoFisicaPageRoutingModule {}
