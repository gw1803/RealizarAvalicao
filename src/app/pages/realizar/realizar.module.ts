import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealizarPageRoutingModule } from './realizar-routing.module';

import { RealizarPage } from './realizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealizarPageRoutingModule
  ],
  declarations: [RealizarPage]
})
export class RealizarPageModule {}
