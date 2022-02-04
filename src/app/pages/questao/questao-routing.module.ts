import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestaoPage } from './questao.page';

const routes: Routes = [
  {
    path: '',
    component: QuestaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestaoPageRoutingModule {}
