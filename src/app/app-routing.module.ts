import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokkenComponent } from './tokken/tokken.component';
import { LoginComponent } from './login/login.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { EditardatosComponent } from './editardatos/editardatos.component';
import { OtherdataComponent } from './otherdata/otherdata.component';
import { InformationComponent } from './information/information.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/genres.component';
import { ArtistsProfileComponent } from './artists-profile/artists-profile.component';
import { DiscProfileComponent } from './disc-profile/disc-profile.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tokken', component: TokkenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'editardatos', component: EditardatosComponent },
  { path: 'otherdata', component: OtherdataComponent },
  { path: 'information', component: InformationComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'disc-profile/:albumName', component: DiscProfileComponent },
  { path: 'artists-profile/:artistName', component: ArtistsProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFoundComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'tokken', component: TokkenComponent, canActivate: [AuthGuard] },
  {
    path: 'bienvenido',
    component: BienvenidoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'otherdata',
    component: OtherdataComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'information',
    component: InformationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editardatos',
    component: EditardatosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
