import { useState, useEffect } from 'react';
import { X, Plus, Minus, User, Mail, ShieldCheck, Sparkles, CheckCircle2, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event, TicketClass, TicketOption, PurchasedTicket } from '../types';

interface CheckoutDrawerProps {
  event: Event | null;
  onClose: () => void;
  onPurchaseSuccess: (ticket: PurchasedTicket) => void;
}

export default function CheckoutDrawer({ event, onClose, onPurchaseSuccess }: CheckoutDrawerProps) {
  const [ticketClass, setTicketClass] = useState<TicketClass>('general');
  const [quantity, setQuantity] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  // Checking states
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [generatedTicket, setGeneratedTicket] = useState<PurchasedTicket | null>(null);

  // Form errors
  const [error, setError] = useState<string>('');

  // Lock scrolling when open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [event]);

  if (!event) return null;

  // Options detail
  const ticketOptions: TicketOption[] = [
    {
      id: 'general',
      name: 'Entrada General',
      price: event.price,
      description: 'Acceso estándar al recinto del evento y zonas comunes.',
      perks: ['Acceso estándar al evento', 'Consumición básica si ingresas antes de las 00:30', 'Pista principal']
    },
    {
      id: 'vip',
      name: 'Entrada VIP Pass',
      price: Math.round(event.price * 2.2),
      description: 'Acceso preferente sin colas, zona elevada y servicios privados.',
      perks: ['Acceso preferente Fast Lane (sin colas)', 'Zona VIP con visibilidad premium', '1 Copa premium de bienvenida gratis', 'Acceso a aseos privados VIP']
    },
    {
      id: 'backstage',
      name: 'Backstage Experience',
      price: Math.round(event.price * 4.5),
      description: 'Acceso total de altura. Barra libre, merchandising y área con artistas.',
      perks: ['Zona de altura integrada en cabina del DJ', 'Barra libre premium durante la noche', 'Pack de merchandising especial Noctix', 'Estacionamiento VIP gratuito reservado']
    }
  ];

  const activeOption = ticketOptions.find(opt => opt.id === ticketClass)!;
  const serviceFee = 2.50;
  const subtotal = activeOption.price * quantity;
  const total = subtotal + serviceFee;

  const handleApplyPurchase = () => {
    // Validate inputs
    if (!name.trim()) {
      setError('Por favor, ingresa tu nombre completo para la entrada.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, ingresa un correo electrónico de contacto válido.');
      return;
    }
    setError('');
    
    // Jump to processing state with mock timer messages
    setStep('processing');
    setProgressMsg('Conectando con el servidor seguro de Noctix...');
    
    setTimeout(() => {
      setProgressMsg('Autorizando transacción bancaria...');
    }, 1200);

    setTimeout(() => {
      setProgressMsg('Confirmando cupos con la promotora...');
    }, 2400);

    setTimeout(() => {
      setProgressMsg('Generando código QR encriptado y pase digital...');
    }, 3600);

    setTimeout(() => {
      // Completed, trigger success!
      const uniqueId = 'NCT-' + Math.random().toString(36).substring(2, 11).toUpperCase();
      const newTicket: PurchasedTicket = {
        id: uniqueId,
        event: event,
        purchaserName: name,
        purchaserEmail: email,
        ticketClass: ticketClass,
        quantity: quantity,
        totalPaid: total,
        purchaseDate: new Date().toLocaleDateString('es-ES', { 
          day: '2-digit', 
          month: 'long', 
          year: 'numeric' 
        }),
        qrCodeValue: `NOCTIX-TICKET-${uniqueId}-${email}`
      };
      
      setGeneratedTicket(newTicket);
      onPurchaseSuccess(newTicket);
      setStep('success');
    }, 4800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay background */}
      <div 
        onClick={step !== 'processing' ? onClose : undefined}
        className="absolute inset-0 bg-[#03000a]/75 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Main Drawer Body Container */}
      <div className="relative w-full max-w-md h-full bg-[#0a0815]/95 border-l border-white/5 shadow-2xl flex flex-col z-10 overflow-hidden font-sans">
        
        {/* Decorative corner light glow */}
        <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-violet-600/10 blur-2xl"></div>

        {/* Header toolbar */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/5 bg-[#0d0a1d]">
          <div className="text-left">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">Adquirir Entradas</h3>
            <p className="font-mono text-[10px] text-violet-400 mt-0.5 truncate max-w-[200px]">
              {event.title}
            </p>
          </div>
          {step !== 'processing' && (
            <button 
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dynamic Multi-Step body content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'details' && (
            <div className="flex flex-col gap-6 text-left">
              
              {/* Event Context card */}
              <div className="relative rounded-2xl border border-white/5 bg-[#0e0c1f] p-4 overflow-hidden select-none">
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${event.imageAccent} opacity-30`}></div>
                <span className="font-mono text-[8px] font-bold text-fuchsia-400 uppercase tracking-widest">{event.genre}</span>
                <h4 className="font-display text-base font-extrabold text-white mt-1 ">{event.title}</h4>
                <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                  <span>{event.location}</span>
                  <span className="inline-block h-1 w-1 rounded-full bg-gray-600"></span>
                  <span>{event.fullDate}</span>
                </p>
              </div>

              {/* Step Title */}
              <div>
                <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest">Paso 1 de 2</span>
                <h5 className="font-display text-base font-extrabold text-white mt-0.5">Selecciona tu categoría de entrada</h5>
              </div>

              {/* Interactive Ticket options list */}
              <div className="flex flex-col gap-3">
                {ticketOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setTicketClass(opt.id)}
                    className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                      ticketClass === opt.id
                        ? 'bg-violet-950/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                        : 'bg-[#0f0c22]/50 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className={`font-display text-sm font-extrabold transition-colors ${
                        ticketClass === opt.id ? 'text-violet-300' : 'text-white'
                      }`}>
                        {opt.name}
                      </p>
                      <p className="font-display text-base font-black text-white">
                        €{opt.price}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-gray-400 mt-1 lines-clamp-2 leading-relaxed">
                      {opt.description}
                    </p>

                    {/* Features checklist dropdown elements */}
                    {ticketClass === opt.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                        className="mt-3.5 pt-3.5 border-t border-violet-500/10 flex flex-col gap-1.5"
                      >
                        {opt.perks.map((perk, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-300 font-medium">
                            <Sparkles className="h-3 w-3 text-fuchsia-400 shrink-0" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quantity Incrementor panel */}
              <div className="flex items-center justify-between border-t border-b border-white/5 py-4">
                <div className="text-left font-semibold text-sm text-gray-300">
                  Cantidad de entradas
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 active:scale-95 disabled:opacity-40 text-gray-300 transition-all cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-sans text-lg font-bold text-white w-6 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => quantity < 6 && setQuantity(quantity + 1)}
                    disabled={quantity >= 6}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 active:scale-95 disabled:opacity-40 text-gray-300 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Step Title 2 */}
              <div className="pt-2">
                <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest">Paso 2 de 2</span>
                <h5 className="font-display text-base font-extrabold text-white mt-0.5">Información Personal</h5>
              </div>

              {/* Input forms */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Nombre Completo</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ej. Martín García"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0c0a15] border border-white/5 text-gray-200 placeholder-gray-600 rounded-xl px-4 py-3 pl-10 text-xs focus:outline-none focus:border-violet-500 transition-all font-sans"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Correo Electrónico (Para recibir QR)</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Ej. martin@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0c0a15] border border-white/5 text-gray-200 placeholder-gray-600 rounded-xl px-4 py-3 pl-10 text-xs focus:outline-none focus:border-violet-500 transition-all font-sans"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Display errors if any */}
              {error && (
                <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center gap-2">
                  <X className="h-4 w-4 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

            </div>
          )}

          {step === 'processing' && (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-12">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin"></div>
                <CreditCard className="h-6 w-6 text-violet-400" />
              </div>
              <div className="flex flex-col gap-2 max-w-xs">
                <p className="font-display text-base font-bold text-white">Transacción Segura en Curso</p>
                <p className="font-sans text-xs text-gray-400 animate-pulse leading-relaxed">
                  {progressMsg}
                </p>
              </div>
            </div>
          )}

          {step === 'success' && generatedTicket && (
            <div className="flex flex-col gap-6 text-center text-left py-4">
              
              {/* Success badge */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 border border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="font-display text-lg font-bold text-white mt-1">¡Compra Completada!</h4>
                <p className="font-sans text-xs text-gray-400 max-w-xs">
                  Tu pase de entrada digital se ha expedido de forma segura para ingresar al evento de inmediato.
                </p>
              </div>

              <hr className="border-white/5" />

              {/* Physical looking tickets card design */}
              <div className="border border-violet-500/30 rounded-2xl bg-gradient-to-tr from-[#0a0715] to-[#120524] p-4 relative overflow-hidden flex flex-col gap-4">
                <div className="absolute top-2 right-2 rounded-full bg-green-500/10 px-2 py-0.5 text-[8px] font-bold text-green-400 border border-green-500/25">
                  EXPEDIDO
                </div>

                <div className="text-left select-none">
                  <p className="font-mono text-[9px] text-[#a855f7] font-semibold tracking-wider uppercase">
                    {generatedTicket.event.genre} • {generatedTicket.ticketClass.toUpperCase()} PASS
                  </p>
                  <h4 className="font-display text-base font-extrabold text-white mt-0.5 leading-tight">{generatedTicket.event.title}</h4>
                </div>

                <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-left border-t border-b border-white/5 py-4 font-mono text-[10px] text-gray-400">
                  <div>
                    <span className="text-gray-500 block uppercase tracking-wide text-[8px] mb-0.5">Titular</span>
                    <span className="text-white font-semibold truncate block">{generatedTicket.purchaserName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block uppercase tracking-wide text-[8px] mb-0.5">Fecha Compra</span>
                    <span className="text-white font-semibold block">{generatedTicket.purchaseDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block uppercase tracking-wide text-[8px] mb-0.5">Cantidad</span>
                    <span className="text-white font-semibold block">{generatedTicket.quantity}x entradas</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block uppercase tracking-wide text-[8px] mb-0.5">Precio Total</span>
                    <span className="text-white font-semibold block">€{generatedTicket.totalPaid.toFixed(2)}</span>
                  </div>
                </div>

                {/* Simulated QR block layout */}
                <div className="flex flex-col items-center gap-2 select-none">
                  <div className="p-2.5 bg-white rounded-xl flex items-center justify-center">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(generatedTicket.qrCodeValue)}&color=03000a`} 
                      alt="Valid QR code" 
                      className="h-28 w-28 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="font-mono text-[9px] text-gray-500 mt-1 uppercase tracking-widest text-[#a855f7] font-bold">
                    Código de Entrada: {generatedTicket.id}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-violet-950/20 border border-violet-500/10 p-4 text-xs text-gray-400 leading-relaxed text-left flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Importante</p>
                  <p className="mt-0.5 font-sans">Se ha enviado una copia en formato PDF con el código de canje a <strong className="text-gray-300">{generatedTicket.purchaserEmail}</strong>. Adicionalmente, se ha añadido automáticamente a tu portafolios virtual de Noctix Wallet de la barra superior.</p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Sticky footer price billing bar */}
        {step === 'details' && (
          <div className="bg-[#0e0c1f] px-6 py-5 border-t border-white/5 text-left">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Precio estimado</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-display text-2xl font-extrabold text-white">
                    €{total.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    (Gastos de gestión incl.)
                  </span>
                </div>
              </div>
              <div className="text-right text-xs text-gray-400 font-mono">
                {quantity}x €{activeOption.price}
                <span className="block text-[10px] text-gray-500 font-sans mt-0.5">Gasto gest. €2.50</span>
              </div>
            </div>

            <button
              onClick={handleApplyPurchase}
              className="cursor-pointer w-full text-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:brightness-110 active:scale-[0.98] transition-all duration-300"
            >
              Confirmar y Proceder al Pago
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="bg-[#0e0c1f] px-6 py-5 border-t border-white/5 text-left">
            <button
              onClick={onClose}
              className="cursor-pointer w-full text-center rounded-full border border-violet-500/20 bg-violet-950/20 py-3 text-sm font-bold text-violet-300 hover:bg-violet-900/30 transition-all duration-300"
            >
              Cerrar y Ver Mi Wallet
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
