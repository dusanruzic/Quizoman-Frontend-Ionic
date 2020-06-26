import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 't',
    component: TabsPage,

    children: [
      {path: 'game-types', loadChildren: '../game-types/game-types.module#GameTypesPageModule'},
      { path: 'uputstvo', loadChildren: '../uputstvo/uputstvo.module#UputstvoPageModule' },

    ]
  },
  {
    path: '',
    redirectTo: 't/game-types',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
