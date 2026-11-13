import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegulamentoComponent } from './pages/regulamento/regulamento.component';
import { SerieAComponent } from './pages/serie-a/serie-a.component';
import { ClassificacaoComponentA } from './pages/serie-a/classificacao/classificacao.component';
import { SerieBComponent } from './pages/serie-b/serie-b.component';
import { ComponetsComponent } from './componentes/componets/componets.component';


    

export const routes: Routes = [
    
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'categoria-a', component: SerieAComponent },
    { path: 'categoria-b', component: SerieBComponent },
    // Aba Scout do mata-mata (carregada só quando acessada)
    { path: 'categoria-a/scout', data: { serie: 'A' }, loadComponent: () => import('./pages/scout/scout.component').then(m => m.ScoutComponent) },
    { path: 'categoria-b/scout', data: { serie: 'B' }, loadComponent: () => import('./pages/scout/scout.component').then(m => m.ScoutComponent) },
    { path: 'regulamento', component: RegulamentoComponent },
    // Notícias do mata-mata (/noticias e /noticias/:id); o antigo /blog leva para lá
    { path: 'noticias', loadComponent: () => import('./pages/noticias/noticias.component').then(m => m.NoticiasComponent) },
    { path: 'noticias/:id', loadComponent: () => import('./pages/noticias/noticias.component').then(m => m.NoticiasComponent) },
    { path: 'blog', redirectTo: '/noticias', pathMatch: 'full' },
    { path: 'serie-aclassificacao', component: ClassificacaoComponentA },
    { path: 'component', component: ComponetsComponent },
];
