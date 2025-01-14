import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegulamentoComponent } from './pages/regulamento/regulamento.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SerieAComponent } from './pages/serie-a/serie-a.component';
import { ClassificacaoComponentA } from './pages/serie-a/classificacao/classificacao.component';


    

export const routes: Routes = [
    
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'serie-a', component: SerieAComponent },
    { path: 'serie-b', component: SerieAComponent },
    { path: 'regulamento', component: RegulamentoComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'serie-aclassificacao', component: ClassificacaoComponentA },
];
