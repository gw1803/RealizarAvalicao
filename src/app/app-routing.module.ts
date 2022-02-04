import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'realizar/:idAvaliacao',
    loadChildren: () => import('./pages/realizar/realizar.module').then( m => m.RealizarPageModule)
  },
  {
    path: 'avaliacao',
    loadChildren: () => import('./pages/avaliacao/avaliacao.module').then( m => m.AvaliacaoPageModule)
  },
  {
    path: 'visualizar/:idAvaliacao',
    loadChildren: () => import('./pages/visualizar/visualizar.module').then( m => m.VisualizarPageModule)
  },
  {
    path: 'questao',
    loadChildren: () => import('./pages/questao/questao.module').then( m => m.QuestaoPageModule)
  },
  {
    path: 'selecao',
    loadChildren: () => import('./pages/selecao/selecao.module').then( m => m.SelecaoPageModule)
  },
  {
    path: 'questao-fisica/:idParte',
    loadChildren: () => import('./pages/questao-fisica/questao-fisica.module').then( m => m.QuestaoFisicaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
