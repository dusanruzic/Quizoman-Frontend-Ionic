import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KreirajPitanjePage } from './kreiraj-pitanje.page';

const routes: Routes = [
  {
    path: '',
    component: KreirajPitanjePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KreirajPitanjePage]
})
export class KreirajPitanjePageModule {}
