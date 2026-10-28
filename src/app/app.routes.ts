import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'BRUNEITOR.AI | Asistente IA para WhatsApp y Ventas 24/7',
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
    title: 'Políticas de Privacidad - BRUNEITOR.AI (RUC: 10743714330)',
  },
  {
    path: 'politica-privacidad',
    redirectTo: 'privacidad',
    pathMatch: 'full',
  },
  {
    path: 'politicas-de-privacidad',
    redirectTo: 'privacidad',
    pathMatch: 'full',
  },
  {
    path: 'privacy',
    redirectTo: 'privacidad',
    pathMatch: 'full',
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/terms/terms.component').then((m) => m.TermsComponent),
    title: 'Términos y Condiciones del Servicio - BRUNEITOR.AI',
  },
  {
    path: 'terminos-y-condiciones',
    redirectTo: 'terminos',
    pathMatch: 'full',
  },
  {
    path: 'terms',
    redirectTo: 'terminos',
    pathMatch: 'full',
  },
  {
    path: 'eliminacion-datos',
    loadComponent: () => import('./pages/data-deletion/data-deletion.component').then((m) => m.DataDeletionComponent),
    title: 'Instrucciones de Eliminación de Datos de Usuario - BRUNEITOR.AI',
  },
  {
    path: 'data-deletion',
    redirectTo: 'eliminacion-datos',
    pathMatch: 'full',
  },
  {
    path: 'borrado-datos',
    redirectTo: 'eliminacion-datos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
