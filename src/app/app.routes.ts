import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ClientsComponent } from './dashboard/views/clients/clients.component';
import { ProductsComponent } from './dashboard/views/products/products.component';
import { HomeComponent } from './dashboard/views/home/home.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'clientes',
        component: ClientsComponent,
      },
      {
        path: 'clientes-selecionados',
        component: ClientsComponent,
      },
      {
        path: 'produtos',
        component: ProductsComponent,
      },
      {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
