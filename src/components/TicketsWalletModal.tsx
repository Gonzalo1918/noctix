import { X, Ticket, Share2, Download, MapPin, Calendar, User, Sparkles, Smartphone, Award } from 'lucide-react';
import { PurchasedTicket } from '../types';

interface TicketsWalletModalProps {
  tickets: PurchasedTicket[];
  isOpen: boolean;
  onClose: () => void;
  onSetAsHeroActive: (ticket: PurchasedTicket) => void;
  activeHeroTicketId?: string;
}

export default function TicketsWalletModal({
  tickets,
  isOpen,
  onClose,
  onSetAsHeroActive,
  activeHeroTicketId
}: TicketsWalletModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay background */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#03000a]/80 backdrop-blur-md transition-opacity"
      ></div>

      {/* Main Modal Box container */}
      <div className="relative w-full max-w-lg max-h-[85vh] bg-[#0c0a1de6] border border-white/5 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 font-sans">
        
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-violet-600/10 blur-2xl"></div>

        {/* Header bar */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-[#0e0c1f]">
          <div className="text-left">
            <h3 className="font-display text-base font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
              <Ticket className="h-4.5 w-4.5 text-violet-400" />
              Noctix Digital Wallet
            </h3>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-0.5">
              Tus pases activos ({tickets.length})
            </p>
          </div>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body contents */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {tickets.length > 0 ? (
            <div className="flex flex-col gap-5">
              {tickets.map((t) => {
                const isActiveInHeroPhone = activeHeroTicketId === t.id;

                return (
                  <div
                    key={t.id}
                    className={`rounded-2xl border p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 bg-[#0d0b20] ${
                      isActiveInHeroPhone 
                        ? 'border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.15)] bg-gradient-to-tr from-[#130d2a] to-[#0d0b20]' 
                        : 'border-white/5 bg-[#0e0c20]/50 hover:border-white/10'
                    }`}
                  >
                    {/* Status marker */}
                    <div className="flex items-center justify-between text-left relative">
                      <span className="font-mono text-[9px] text-[#a855f7] font-bold tracking-wider uppercase">
                        {t.event.genre} • {t.ticketClass.toUpperCase()} PASS
                      </span>
                      
                      <div className="flex items-center gap-2 select-none">
                        {isActiveInHeroPhone ? (
                          <span className="rounded-full bg-violet-600/20 text-violet-300 px-2.5 py-0.5 text-[8px] font-bold border border-violet-500/20 flex items-center gap-1">
                            <Smartphone className="h-3 w-3" />
                            ACTIVO EN MÓVIL
                          </span>
                        ) : (
                          <button
                            onClick={() => onSetAsHeroActive(t)}
                            className="text-[8px] font-bold bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-2.5 py-1 rounded-full border border-white/5 shrink-0 transition-colors cursor-pointer"
                          >
                            MOSTRAR EN MÓVIL (ARRIBA)
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="text-left">
                      <h4 className="font-display text-sm font-extrabold text-white leading-snug">{t.event.title}</h4>
                      
                      <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-left mt-3 pt-3 border-t border-white/5 font-mono text-[10px] text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                          <span className="truncate block max-w-[150px]">{t.event.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                          <span className="truncate">{t.event.fullDate.split(',')[1]}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                          <span className="truncate max-w-[150px]">{t.purchaserName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                          <span>{t.quantity}x entradas</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer QR generator block and options download etc */}
                    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-3.5 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-1 bg-white rounded-lg shrink-0 select-none">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${encodeURIComponent(t.qrCodeValue)}&color=03000a`} 
                            alt="QR code scale" 
                            className="h-11 w-11 object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest text-left leading-snug">
                          ID: {t.id} <br />
                          <span className="text-[8px] text-gray-600 block">Autorizado el {t.purchaseDate}</span>
                        </p>
                      </div>

                      {/* Action files sim */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => alert(`Enlace temporal copiado. El titular ${t.purchaserName} puede compartir este código QR.`)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert(`Descargando archivo NOCTIX-${t.id}.pdf de forma segura en tus descargas...`)}
                          className="font-mono text-xs font-bold gap-1 px-3.5 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-colors flex items-center cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Descargar PDF</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            // Empty wallet state
            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
              <div className="h-12 w-12 rounded-full bg-white/5 border border-white/15 text-gray-500 flex items-center justify-center mb-4">
                <Ticket className="h-5 w-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-white">Tu Wallet está vacía</h4>
              <p className="font-sans text-xs text-gray-500 max-w-xs mt-1 leading-relaxed">
                Aún no has adquirido ninguna entrada segura en esta sesión. Elige tu evento abajo de la página, completa el pago y ve tu pase digital aquí.
              </p>
              <button
                onClick={onClose}
                className="cursor-pointer border border-violet-500/30 bg-violet-950/20 text-violet-300 rounded-full py-2.5 px-6 text-xs font-bold mt-5 hover:bg-violet-900/30 transition-all font-sans"
              >
                Explorar eventos activos
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
