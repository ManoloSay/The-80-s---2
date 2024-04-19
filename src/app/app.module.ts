import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokkenComponent } from './tokken/tokken.component';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { HttpClientModule } from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { EditardatosComponent } from './editardatos/editardatos.component';
import { OtherdataComponent } from './otherdata/otherdata.component';
import { InformationComponent } from './information/information.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/genres.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsProfileComponent } from './artists-profile/artists-profile.component';
import { DiscProfileComponent } from './disc-profile/disc-profile.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tokken/:token/:email', component: TokkenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bienvenido/:email', component: BienvenidoComponent },
  { path: 'editardatos', component: EditardatosComponent },
  { path: 'otherdata', component: OtherdataComponent },
  { path: 'information', component: InformationComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'disc-profile', component: DiscProfileComponent },
  { path: 'artists-profile', component: ArtistsProfileComponent },
  { path: '*', component: NotFoundComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TokkenComponent,
    BienvenidoComponent,
    EditardatosComponent,
    OtherdataComponent,
    InformationComponent,
    NotFoundComponent,
    DashboardComponent,
    GenresComponent,
    ArtistsComponent,
    ArtistsProfileComponent,
    DiscProfileComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
