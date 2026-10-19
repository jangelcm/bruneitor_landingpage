import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export type ShowcaseTab = 'inbox' | 'ai-config' | 'calendar' | 'broadcasts';
export type LegalModalType = 'privacy' | 'terms' | 'data-deletion';

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface DemoFormModel {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  industry: string;
  monthlyVolume: string;
  notes: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Estado de Navegación y UI
  mobileMenuOpen = signal<boolean>(false);
  darkMode = signal<boolean>(false);
  activeTab = signal<ShowcaseTab>('inbox');
  openFaqIndex = signal<number | null>(0);

  // Modales
  isDemoModalOpen = signal<boolean>(false);
  isSubmittingDemo = signal<boolean>(false);
  demoSubmitted = signal<boolean>(false);
  activeLegalModal = signal<LegalModalType | null>(null);

  // Legal & Cookies
  showCookieBanner = signal<boolean>(false);

  // Datos Comerciales y Fiscales Oficiales (Requeridos para Verificación de Meta)
  readonly legalTaxId = '10743714330';
  readonly legalBusinessName = 'JAZBRU (Operador de BRUNEITOR.AI)';
  readonly legalOwnerName = 'José Ángel Chávez Mendoza';
  readonly contactEmail = 'contacto@bruneitor.com';
  readonly supportEmail = 'contacto@bruneitor.com';
  readonly officialWhatsAppNumber = '51923637205';
  readonly officialPhoneDisplay = '+51 923 637 205';
  readonly fiscalAddress = 'Lima, Perú';
  readonly currentYear = new Date().getFullYear();

  // Formulario de Solicitud de Demostración
  demoForm: DemoFormModel = {
    name: '',
    company: '',
    whatsapp: '',
    email: '',
    industry: 'Servicios Profesionales / Consultoría',
    monthlyVolume: '500 a 2,000 chats/mes',
    notes: '',
  };

  // Preguntas Frecuentes Clave (FAQ)
  readonly faqs: FaqItem[] = [
    {
      question: '¿Por qué con BRUNEITOR.AI mi número nunca será bloqueado ni suspendido?',
      answer:
        'A diferencia de las herramientas no oficiales que funcionan escaneando códigos QR o emulando WhatsApp Web (lo cual viola las políticas de Meta y provoca suspensiones masivas a diario), BRUNEITOR.AI opera exclusivamente mediante la API Oficial de Meta Cloud (WhatsApp Business Platform). Todos los mensajes, plantillas y conexiones están autorizados y verificados directamente por Meta.',
      category: 'Seguridad Anti-Bloqueos',
    },
    {
      question: '¿Mis asesores humanos pueden chatear al mismo tiempo que la Inteligencia Artificial?',
      answer:
        'Totalmente. BRUNEITOR.AI está diseñado para colaboración híbrida: el asistente IA atiende en menos de 2 segundos, califica al cliente y agenda citas. Si el cliente solicita hablar con una persona o presenta una consulta compleja, la IA pausa su respuesta para ese chat, le notifica a tu equipo con un resumen ejecutivo y el asesor responde en vivo desde la misma bandeja.',
      category: 'Operación Híbrida',
    },
    {
      question: '¿Necesito saber programar o tener conocimientos técnicos de IA?',
      answer:
        'Cero código. Nuestro panel de configuración cuenta con un asistente guiado de 5 pasos en lenguaje de negocio cotidiano. Solo eliges la plantilla de tu rubro comercial (Salud, Consultoría, E-commerce, Inmobiliaria), cargas tus productos o servicios y seleccionas el tono de respuesta con un solo clic.',
      category: 'Facilidad de Uso',
    },
    {
      question: '¿Qué canales de mensajería puedo centralizar en la misma bandeja?',
      answer:
        'Puedes conectar WhatsApp Business Cloud API, Instagram Direct, Facebook Messenger y TikTok Business Messaging. Todas las conversaciones de tus redes sociales ingresan en tiempo real a una única bandeja unificada.',
      category: 'Omnicanalidad',
    },
    {
      question: '¿Cómo funciona el control de costos y la ventana de 24 horas de WhatsApp?',
      answer:
        'Meta permite mensajería libre y sin costo por plantilla durante las primeras 24 horas tras el mensaje del cliente. Nuestro sistema te muestra un cronómetro en vivo de cada conversación y te alerta antes de que venza la ventana para que puedas enviar recordatorios oportunos o reaperturar con plantillas oficiales aprobadas.',
      category: 'Ahorro de Costos',
    },
    {
      question: '¿Cómo puedo probar la plataforma o solicitar una demostración para mi empresa?',
      answer:
        'Puedes solicitar una demostración guiada haciendo clic en el botón "Solicitar Demo" de esta página o escribiéndonos directamente a nuestro WhatsApp oficial. Uno de nuestros consultores preparará un entorno demo personalizado con los servicios de tu propio negocio.',
      category: 'Prueba y Demo',
    },
  ];

  ngOnInit() {
    this.initDarkMode();
    this.checkCookieConsent();
    this.checkDirectHashRouting();
  }

  // --- COMPATIBILIDAD CON URLs DIRECTAS CON HASH ---
  private checkDirectHashRouting() {
    if (typeof window === 'undefined') return;

    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#privacidad' || hash === '#politica-privacidad' || hash === '#privacy') {
        this.activeLegalModal.set('privacy');
      } else if (hash === '#terminos' || hash === '#terminos-condiciones' || hash === '#terms') {
        this.activeLegalModal.set('terms');
      } else if (
        hash === '#eliminacion-datos' ||
        hash === '#data-deletion' ||
        hash === '#borrado-datos'
      ) {
        this.activeLegalModal.set('data-deletion');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
  }

  // --- MODO OSCURO / CLARO ---
  private initDarkMode() {
    if (typeof window === 'undefined') return;
    const savedTheme = localStorage.getItem('bruneitor_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.darkMode.set(true);
      document.documentElement.classList.add('dark');
    } else {
      this.darkMode.set(false);
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode() {
    const nextState = !this.darkMode();
    this.darkMode.set(nextState);
    if (typeof window !== 'undefined') {
      if (nextState) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('bruneitor_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('bruneitor_theme', 'light');
      }
    }
  }

  // --- CONTROL DE COOKIES ---
  private checkCookieConsent() {
    if (typeof window === 'undefined') return;
    const consent = localStorage.getItem('bruneitor_cookies_consent');
    if (!consent) {
      setTimeout(() => {
        this.showCookieBanner.set(true);
      }, 1200);
    }
  }

  acceptAllCookies() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bruneitor_cookies_consent', 'all');
    }
    this.showCookieBanner.set(false);
  }

  acceptEssentialCookies() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bruneitor_cookies_consent', 'essential');
    }
    this.showCookieBanner.set(false);
  }

  rejectCookies() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bruneitor_cookies_consent', 'rejected');
    }
    this.showCookieBanner.set(false);
  }

  // --- NAVEGACIÓN SUAVE ---
  scrollTo(elementId: string) {
    this.mobileMenuOpen.set(false);
    if (typeof document === 'undefined') return;
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // --- TABS DEL SHOWCASE DE PLATAFORMA ---
  setActiveTab(tab: ShowcaseTab) {
    this.activeTab.set(tab);
  }

  // --- ACORDEÓN DE PREGUNTAS FRECUENTES ---
  toggleFaq(index: number) {
    if (this.openFaqIndex() === index) {
      this.openFaqIndex.set(null);
    } else {
      this.openFaqIndex.set(index);
    }
  }

  // --- MODAL DE SOLICITUD DE DEMO ---
  openDemoModal(prefilledIndustry?: string) {
    if (prefilledIndustry) {
      this.demoForm.industry = prefilledIndustry;
    }
    this.demoSubmitted.set(false);
    this.isDemoModalOpen.set(true);
  }

  closeDemoModal() {
    this.isDemoModalOpen.set(false);
  }

  submitDemoForm() {
    if (!this.demoForm.name.trim() || !this.demoForm.whatsapp.trim()) {
      return;
    }

    this.isSubmittingDemo.set(true);
    setTimeout(() => {
      this.isSubmittingDemo.set(false);
      this.demoSubmitted.set(true);
    }, 900);
  }

  getWhatsAppDirectUrl(customText?: string): string {
    const text =
      customText ||
      `Hola BRUNEITOR.AI, me interesa conocer una demostración de su plataforma SaaS con IA oficial de Meta para mi empresa.`;
    return `https://wa.me/${this.officialWhatsAppNumber}?text=${encodeURIComponent(text)}`;
  }

  // --- MODALES LEGALES ---
  openLegalModal(type: LegalModalType) {
    this.activeLegalModal.set(type);
    if (typeof window !== 'undefined') {
      if (type === 'privacy') {
        window.location.hash = 'privacidad';
      } else if (type === 'terms') {
        window.location.hash = 'terminos';
      } else if (type === 'data-deletion') {
        window.location.hash = 'eliminacion-datos';
      }
    }
  }

  closeLegalModal() {
    this.activeLegalModal.set(null);
    if (typeof window !== 'undefined') {
      if (
        ['#privacidad', '#terminos', '#eliminacion-datos', '#privacy', '#terms', '#data-deletion'].includes(
          window.location.hash
        )
      ) {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    }
  }
}

