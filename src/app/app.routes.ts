import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegulamentoComponent } from './pages/regulamento/regulamento.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SerieAComponent } from './pages/serie-a/serie-a.component';
import { ClassificacaoComponentA } from './pages/serie-a/classificacao/classificacao.component';
import { SerieBComponent } from './pages/serie-b/serie-b.component';
import { ComponetsComponent } from './componentes/componets/componets.component';


    

export const routes: Routes = [
    
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'categoria-a', component: SerieAComponent },
    { path: 'categoria-b', component: SerieBComponent },
    { path: 'regulamento', component: RegulamentoComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'serie-aclassificacao', component: ClassificacaoComponentA },
    { path: 'component', component: ComponetsComponent },
];
