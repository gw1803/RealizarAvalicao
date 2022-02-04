import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestaoFisicaPageRoutingModule } from './questao-fisica-routing.module';


import { QuestaoFisicaPage } from './questao-fisica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    QuestaoFisicaPageRoutingModule
  ],
  declarations: [QuestaoFisicaPage]
})
export class QuestaoFisicaPageModule {}
