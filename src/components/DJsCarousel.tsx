import { useState } from 'react';
import { Sparkles, Calendar, Music, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DJS_DATA, EVENTS_DATA } from '../data';
import { DJ } from '../types';

export default function DJsCarousel() {
  const [selectedDJ, setSelectedDJ] = useState<DJ | null>(null);

  return (
    <section id="artistas" className="px-4 py-16 bg-[#03000b] relative overflow-hidden">
      {/* Visual glowing accent background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-fuchsia-600/5 blur-3xl"></div>

      <div className="mx-auto max-w-5xl">
        
        {/* Section title header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <p className="font-mono text-[10px] font-bold tracking-widest text-[#a855f7] uppercase">Lineup Exclusiva</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Los mejores DJs
          </h2>
          <div className="h-1 w-12 rounded bg-gradient-to-r from-violet-600 to-fuchsia-600 mt-1"></div>
        </div>

        {/* Avatar lists container layout mapped directly to the design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {DJS_DATA.map((dj) => {
            const isSelected = selectedDJ?.id === dj.id;
            
            return (
              <div
                key={dj.id}
                onClick={() => setSelectedDJ(isSelected ? null : dj)}
                className={`cursor-pointer rounded-2xl border p-6 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-violet-950/25 border-violet-500 shadow-[0_4px_25px_rgba(139,92,246,0.15)]' 
                    : 'bg-[#0b0816]/65 border-white/5 hover:border-white/10 hover:shadow-[0_4px_15px_rgba(255,255,255,0.02)]'
                }`}
              >
                {/* Glowing ring centered around circle avatar */}
                <div className="relative">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full font-display text-lg font-black text-white bg-gradient-to-tr ${dj.glowColor} relative z-10 shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform duration-300`}>
                    {dj.initials}
                  </div>
                  {/* Outer pulsating echo ring */}
                  <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr ${dj.glowColor} opacity-20 group-hover:opacity-45 blur-sm transition-all animate-glow-pulse`}></div>
                </div>

                {/* Info titles */}
                <h4 className="font-display text-sm font-bold text-white mt-5 group-hover:text-violet-300 transition-colors">
                  {dj.name}
                </h4>
                <p className="font-sans text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-1">
                  {dj.genre}
                </p>

                {/* Corner quick indicator */}
                <div className="absolute bottom-2.5 right-2.5 text-gray-700 group-hover:text-violet-500/80 transition-colors">
                  <Info className="h-3.5 w-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic expanding info card below selections */}
        <div className="relative min-h-[10px]">
          <AnimatePresence mode="popLayout">
            {selectedDJ && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-violet-500/15 bg-gradient-to-tr from-[#0b0a1a] to-[#04020c] p-6 text-left relative overflow-hidden"
              >
                {/* Ambient graphic glow backdrops */}
                <div className="absolute top-0 right-0 -z-10 h-28 w-28 rounded-full bg-violet-600/5 blur-xl"></div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left avatar text box detail */}
                  <div className="md:col-span-3 flex flex-col items-center text-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full font-display text-base font-black text-white bg-gradient-to-tr ${selectedDJ.glowColor} shadow-[0_0_15px_rgba(139,92,246,0.2)]`}>
                      {selectedDJ.initials}
                    </div>
                    <h5 className="font-display text-base font-extrabold text-white mt-3">{selectedDJ.name}</h5>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-fuchsia-400 mt-0.5">
                      <Music className="h-3 w-3" />
                      {selectedDJ.genre}
                    </span>
                  </div>

                  {/* Right description biography details */}
                  <div className="md:col-span-9 flex flex-col gap-4 text-left">
                    <div>
                      <h6 className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">Biografía de Artista</h6>
                      <p className="font-sans text-xs sm:text-sm text-gray-400 mt-1 lines-clamp-3 leading-relaxed">
                        {selectedDJ.bio}
                      </p>
                    </div>

                    {/* Show upcoming gigs of selected artists inside local schedule databanks */}
                    <div className="pt-2 border-t border-white/5">
                      <h6 className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-violet-400" />
                        Próximas Fechas Noctix en Vivo
                      </h6>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {EVENTS_DATA.filter(evt => evt.lineup?.includes(selectedDJ.name)).map(evt => (
                          <div 
                            key={evt.id}
                            className="rounded-xl border border-white/5 bg-white/5 p-3 flex items-center justify-between gap-2"
                          >
                            <div className="text-left">
                              <p className="font-display text-xs font-bold text-white leading-snug">{evt.title}</p>
                              <p className="text-[10px] text-gray-500 font-mono mt-0.5">{evt.fullDate.split(',')[1]}</p>
                            </div>
                            <span className="text-[10px] text-violet-300 font-semibold bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20 shrink-0">
                              {evt.city}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
