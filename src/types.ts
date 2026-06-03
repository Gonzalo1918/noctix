export interface Event {
  id: string;
  title: string;
  date: string; // e.g. "15 Jun"
  fullDate: string; // e.g. "15 de Junio, 2026"
  time: string; // e.g. "23:00 - 06:00"
  genre: 'Electrónica' | 'Reggaeton' | 'En Vivo' | 'Festivales';
  location: string;
  city: 'Madrid' | 'Barcelona' | 'Ibiza';
  price: number;
  imageAccent: string; // CSS background gradient start
  description: string;
  statusTag?: 'DESTACADO' | 'RECOMENDADO' | 'COMPLETO' | 'OFERTA' | 'ÚLTIMAS' | 'PREMIUM';
  lineup?: string[];
}

export type TicketClass = 'general' | 'vip' | 'backstage';

export interface TicketOption {
  id: TicketClass;
  name: string;
  price: number;
  description: string;
  perks: string[];
}

export interface PurchasedTicket {
  id: string;
  event: Event;
  purchaserName: string;
  purchaserEmail: string;
  ticketClass: TicketClass;
  quantity: number;
  totalPaid: number;
  purchaseDate: string;
  qrCodeValue: string;
}

export interface DJ {
  id: string;
  name: string;
  initials: string;
  genre: string;
  glowColor: string; // Tailwind class
  bio: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
