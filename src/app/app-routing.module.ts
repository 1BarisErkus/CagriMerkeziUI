import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CagriKayitComponent } from './components/cagri-kayit/cagri-kayit.component';
import { CagriListeComponent } from './components/cagri-liste/cagri-liste.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  
  {
    path: 'ana-menu',
    component: HomeComponent,
    children:
    [
      {
        path:'',
        component: CagriListeComponent
      },
      {
        path: 'cagri-liste',
        component: CagriListeComponent
      },
      {
        path: 'cagri-kayit',
        component: CagriKayitComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
