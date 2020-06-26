import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  //{ path: 'game-types', loadChildren: './game-types/game-types.module#GameTypesPageModule' },
  { path: 'game-play/:id', loadChildren: './game-play/game-play.module#GamePlayPageModule' },
  { path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule' },
  { path: 'ranglista', loadChildren: './ranglista/ranglista.module#RanglistaPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'kreiraj-pitanje', loadChildren: './kreiraj-pitanje/kreiraj-pitanje.module#KreirajPitanjePageModule' },
  //{ path: 'uputstvo', loadChildren: './uputstvo/uputstvo.module#UputstvoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
