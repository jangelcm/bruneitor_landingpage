import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent {
  readonly legalTaxId = '10743714330';
  readonly legalBusinessName = 'BRUNEITOR.AI (RUC: 10743714330)';
  readonly contactEmail = 'contacto@bruneitor.ai';
  readonly supportEmail = 'soporte@bruneitor.ai';
  readonly officialPhone = '+51 923 637 205';
  readonly fiscalAddress = 'Lima, Perú';
  readonly lastUpdated = '19 de Octubre de 2026';
}

