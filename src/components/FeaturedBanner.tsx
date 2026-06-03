import { useState, useEffect } from 'react';
import { Calendar, MapPin, Ticket, Sparkles, Clock } from 'lucide-react';

interface FeaturedBannerProps {
  onSelectEvent: () => void;
}

export default function FeaturedBanner({ onSelectEvent }: FeaturedBannerProps) {
  // Setup real target date for the countdown: June 15, 2026
  const targetDate = new Date('2026-06-15T23:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        // Event has started or passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown(); // Run immediately
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-violet-500/20 bg-gradient-to-r from-[#0d0722] via-[#10031f] to-[#04010a] p-6 md:p-8 relative overflow-hidden shadow-[0_4px_35px_rgba(139,92,246,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Background ambient decorative shapes */}
        <div className="absolute top-0 right-1/4 -z-10 h-32 w-32 rounded-full bg-violet-600/10 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full bg-fuchsia-600/10 blur-2xl"></div>

        {/* Info Column */}
        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-fuchsia-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-widest text-fuchsia-400 uppercase">
              Próximo Evento Destacado
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Techno Nights Vol. 12
          </h2>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-violet-400" />
              15 de Junio, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-violet-400" />
              Fabrik, Madrid
            </span>
          </div>
        </div>

        {/* Real Countdown Display */}
        <div className="flex items-center justify-start sm:justify-center gap-3 bg-[#080415] border border-white/5 py-3 px-5 rounded-2xl">
          <div className="flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 pt-0.5 font-semibold">Días</span>
          </div>
          <span className="text-gray-600 font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 pt-0.5 font-semibold">Horas</span>
          </div>
          <span className="text-gray-600 font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 pt-0.5 font-semibold">Mins</span>
          </div>
          <span className="text-gray-600 font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-bold text-fuchsia-400 tracking-tight">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 pt-0.5 font-semibold">Segs</span>
          </div>
        </div>

        {/* Price and CTA Column */}
        <div className="flex items-center justify-between md:flex-col md:items-end gap-3 md:gap-2">
          <div className="text-left md:text-right">
            <p className="text-xs text-gray-500">Precio de preventa</p>
            <p className="font-display text-xl sm:text-2xl font-extrabold text-white">
              €45<span className="text-xs font-semibold text-gray-500"> / general</span>
            </p>
          </div>
          
          <button
            onClick={onSelectEvent}
            className="cursor-pointer group relative flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 active:scale-95"
          >
            <Ticket className="h-4.5 w-4.5 text-white animate-pulse" />
            <span>Reservar Ahora</span>
          </button>
        </div>

      </div>
    </section>
  );
}
