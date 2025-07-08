import { Routes } from '@angular/router';
import { PaginaLoginRegistoComponent } from './components/pagina-login-registo/pagina-login-registo.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { PaginaInicialAdmComponent } from './components/pagina-inicial-adm/pagina-inicial-adm.component';
import { EditarMidiaComponent } from './components/editar-midia/editar-midia.component';
import { GerirUtilizadoresComponent } from './components/gerir-utilizadores/gerir-utilizadores.component';
import { GrupoComponent } from './components/grupo/grupo.component';

export const routes: Routes = [
    { path: "", redirectTo: "pagina-login-registo", pathMatch: "full" }, // Redireciona para página inicial
    { path: "pagina-login-registo", component: PaginaLoginRegistoComponent },
    { path: "pagina-inicial", component: PaginaInicialComponent },
    { path: "pagina-inicial-adm", component: PaginaInicialAdmComponent },
    { path: 'editar-midia/:tipo/:id', component: EditarMidiaComponent },
    { path: 'gerir-utilizadores', component: GerirUtilizadoresComponent },
    { path: 'grupo/:id', component: GrupoComponent }

];
