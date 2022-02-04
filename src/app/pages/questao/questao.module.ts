import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestaoPageRoutingModule } from './questao-routing.module';

import { QuestaoPage } from './questao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestaoPageRoutingModule
  ],
  declarations: [QuestaoPage]
})
export class QuestaoPageModule {}
