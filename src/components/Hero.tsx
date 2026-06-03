import { ArrowRight, Calendar, MapPin, Ticket, Wifi, Battery, Smile, Activity, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PurchasedTicket } from '../types';

interface HeroProps {
  purchasedTickets: PurchasedTicket[];
  onScrollToSection: (id: string) => void;
  onSelectEventById: (id: string) => void;
}

export default function Hero({ purchasedTickets, onScrollToSection, onSelectEventById }: HeroProps) {
  // Use the latest ticket if available, otherwise show a beautiful placeholder default ticket
  const activeTicket: PurchasedTicket | null = purchasedTickets.length > 0 
    ? purchasedTickets[purchasedTickets.length - 1] 
    : null;

  return (
    <section className="relative px-4 pt-10 pb-20 md:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/4 -z-10 h-80 w-80 rounded-full bg-violet-800/20 blur-3xl"></div>
      <div className="absolute top-40 right-1/4 -z-10 h-96 w-96 rounded-full bg-fuchsia-800/15 blur-3xl animate-pulse-slow"></div>

      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Copy Container */}
        <div className="md:col-span-7 flex flex-col gap-6 text-left">
          
          {/* Accent tag */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-violet-500/25 bg-violet-950/20 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
            <span className="flex h-2 w-2 rounded-full bg-fuchsia-400 animate-ping"></span>
            <span className="flex absolute h-2 w-2 rounded-full bg-fuchsia-500"></span>
            <span className="pl-2 font-mono uppercase tracking-widest text-[10px]">La noche te espera</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white">
            Vive experiencias <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(236,72,153,0.3)]">
              inolvidables
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base md:text-lg text-gray-400 max-w-lg leading-relaxed">
            Accede a los eventos más exclusivos de la ciudad. Fiestas, conciertos y experiencias que marcarán tu noche.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onScrollToSection('eventos')}
              className="group cursor-pointer flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-4 text-base font-bold text-white shadow-[0_4px_25px_rgba(139,92,246,0.4)] hover:shadow-[0_4px_35px_rgba(139,92,246,0.6)] hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              <span>Explorar Eventos</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => onScrollToSection('como-funciona')}
              className="cursor-pointer rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-7 py-4 text-base font-bold text-gray-200 hover:text-white hover:border-violet-500/35 transition-all duration-300"
            >
              Cómo Funciona
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 max-w-md">
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">500+</p>
              <p className="font-sans text-[11px] uppercase tracking-wider text-gray-500 mt-1">Eventos</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">250.000+</p>
              <p className="font-sans text-[11px] uppercase tracking-wider text-gray-500 mt-1">Entradas vendidas</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">98%</p>
              <p className="font-sans text-[11px] uppercase tracking-wider text-gray-500 mt-1">Satisfacción</p>
            </div>
          </div>

        </div>

        {/* Right Smartphone Ticket Mockup */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative mx-auto w-72 h-[510px] rounded-[40px] border-4 border-[#1c1a2e] bg-[#07050f] p-3 shadow-2xl shadow-violet-950/40">
            {/* Top Chamber Ear Speaker & Notch details */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-28 bg-[#1c1a2e] rounded-b-2xl z-20 flex items-center justify-between px-3">
              <div className="h-1 w-12 bg-gray-700 rounded-full"></div>
              <div className="h-2 w-2 bg-black rounded-full"></div>
            </div>

            {/* Simulated Phone UI Container */}
            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#090715] flex flex-col pt-6 font-sans">
              
              {/* Status bar */}
              <div className="px-5 py-2 flex items-center justify-between text-[11px] text-gray-400 font-mono z-10 select-none">
                <span>01:05</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="h-3 w-3 text-gray-400" />
                  <span className="text-[10px] font-bold">5G</span>
                  <Battery className="h-3 w-3.5 text-gray-400" />
                </div>
              </div>

              {/* Dynamic Ticket Header */}
              <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-white/5">
                <span className="font-display text-xs font-bold text-violet-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Noctix Wallet
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase">VIP PASS</span>
              </div>

              {/* Real Ticket Body inside phone */}
              <div className="flex-1 p-3 flex flex-col justify-between relative overflow-hidden">
                
                {/* Visual Background Accent Card Glow */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent"></div>

                {activeTicket ? (
                  /* Render user newly purchased ticket */
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="rounded-2xl border border-violet-500/20 bg-violet-950/15 p-3.5 relative">
                      <div className="absolute top-2 right-2 rounded-full bg-violet-500/20 px-2 py-0.5 text-[8px] font-bold text-violet-300">
                        {activeTicket.ticketClass.toUpperCase()}
                      </div>
                      <p className="font-mono text-[9px] text-fuchsia-400 font-semibold tracking-wider">
                        {activeTicket.event.genre.toUpperCase()}
                      </p>
                      <h3 className="font-display text-sm font-bold text-white mt-1 leading-tight">
                        {activeTicket.event.title}
                      </h3>
                      
                      <div className="mt-3.5 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-gray-300">
                          <MapPin className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                          <span className="truncate">{activeTicket.event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-300">
                          <Calendar className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                          <span>{activeTicket.event.fullDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code and scanner visual animation */}
                    <div className="my-auto flex flex-col items-center">
                      <div className="relative p-2.5 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-violet-900/30">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(activeTicket.qrCodeValue)}&color=03000a`} 
                          alt="Ticket QR Code" 
                          className="h-24 w-24 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        {/* Shimmer laser scanner line */}
                        <div className="absolute left-0 right-0 h-0.5 bg-fuchsia-500 shadow-[0_0_10px_#ec4899] animate-bounce"></div>
                      </div>
                      <p className="font-mono text-[9px] text-gray-400 text-center mt-3 tracking-widest uppercase">
                        {activeTicket.purchaserName} • {activeTicket.quantity}x
                      </p>
                      <p className="font-mono text-[8px] text-gray-600 text-center mt-0.5">
                        Cod: {activeTicket.id.substring(0, 12)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-2.5 flex items-center gap-2">
                      <Activity className="h-4.5 w-4.5 text-green-400 shrink-0 animate-pulse" />
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-green-400">Pase Activo Autorizado</p>
                        <p className="text-[8px] text-gray-400">Muestra el QR al ingresar</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Render Default Showcase Ticket (Techno Nights Vol 12) */
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 relative">
                      <div className="absolute top-3 right-3 rounded-full bg-violet-600/30 px-2.5 py-0.5 text-[8px] font-extrabold text-violet-300">
                        VIP ACCESS
                      </div>
                      <p className="font-mono text-[9px] text-violet-400 font-semibold tracking-wider">
                        ELECTRÓNICA
                      </p>
                      <h3 className="font-display text-sm font-bold text-white mt-1 leading-tight">
                        Techno Nights Vol. 12
                      </h3>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-gray-300">
                          <MapPin className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                          <span>Fabrik, Madrid</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-300">
                          <Calendar className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                          <span>15 Junio 2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Pattern placeholder/Simulated scan */}
                    <div className="my-auto flex flex-col items-center">
                      <div 
                        onClick={() => onSelectEventById('techno-nights')}
                        className="group relative cursor-pointer p-2 bg-gradient-to-tr from-[#1c1a2e] to-[#0a0815] border border-violet-500/30 rounded-2xl flex items-center justify-center hover:border-violet-400 transition-colors"
                      >
                        <div className="h-24 w-24 flex items-center justify-center bg-[#05030f] rounded-xl relative overflow-hidden">
                          {/* Beautiful digital noise graphic instead of blank */}
                          <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:10px_10px] opacity-40"></div>
                          <Ticket className="h-10 w-10 text-violet-500 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      <p className="font-mono text-[10px] text-violet-300 text-center mt-3.5 tracking-wide">
                        Click para comprar entrada
                      </p>
                      <p className="font-mono text-[8px] text-gray-500 text-center mt-1">
                        Y mírala activa aquí
                      </p>
                    </div>

                    <div className="rounded-xl bg-violet-950/30 border border-violet-500/10 p-2.5 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-violet-400 shrink-0" />
                      <div className="text-left">
                        <p className="text-[9px] font-bold text-violet-300">Sin entradas autorizadas</p>
                        <p className="text-[8px] text-gray-500">Adquiere un ticket abajo de la web</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Glowing phone highlights */}
            <div className="absolute -inset-0.5 -z-10 rounded-[42px] bg-gradient-to-tr from-violet-600/30 through-transparent to-fuchsia-600/30 opacity-70 blur-md"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
