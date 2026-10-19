import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { DataDeletionComponent } from './pages/data-deletion/data-deletion.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'BRUNEITOR.AI - CRM Omnicanal & Asistente IA Oficial de Meta para Empresas',
  },
  {
    path: 'privacidad',
    component: PrivacyComponent,
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
    component: TermsComponent,
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
    component: DataDeletionComponent,
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
