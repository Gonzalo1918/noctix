import { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Clock, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event } from '../types';
import { EVENTS_DATA } from '../data';

interface EventsGridProps {
  onSelectEvent: (event: Event) => void;
}

export default function EventsGrid({ onSelectEvent }: EventsGridProps) {
  const [activeGenre, setActiveGenre] = useState<string>('Todos');
  const [activeCity, setActiveCity] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const genres = ['Todos', 'Electrónica', 'Reggaeton', 'En Vivo'];
  const cities = ['Todas', 'Madrid', 'Barcelona'];

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter(event => {
      const matchesGenre = activeGenre === 'Todos' || event.genre === activeGenre;
      const matchesCity = activeCity === 'Todas' || event.city === activeCity;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.genre.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGenre && matchesCity && matchesSearch;
    });
  }, [activeGenre, activeCity, searchQuery]);

  return (
    <section id="eventos" className="px-4 py-16 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        
        {/* Title Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-10">
          <p className="font-mono text-[10px] font-bold tracking-widest text-[#a855f7] uppercase">Próximos Eventos</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Descubre la noche
          </h2>
          <div className="h-1 w-12 rounded bg-gradient-to-r from-violet-600 to-fuchsia-600 mt-1"></div>
        </div>

        {/* Filter controls panel */}
        <div className="flex flex-col gap-4 mb-8">
          
          {/* Main Controls row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input bar */}
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Buscar festival, club, ciudad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0c0a15]/80 border border-white/5 text-gray-200 placeholder-gray-500 rounded-full px-5 py-3 pl-11 text-xs focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all font-sans"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            </div>

            {/* City Quick selector */}
            <div className="flex items-center gap-3 self-start">
              <span className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-violet-400" />
                Ciudad:
              </span>
              <div className="flex bg-[#0c0a15] rounded-full p-1 border border-white/5">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setActiveCity(city)}
                    className={`cursor-pointer px-3.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                      activeCity === city
                        ? 'bg-violet-950/40 text-violet-300'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Genre Tag Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`cursor-pointer px-5 py-2.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
                  activeGenre === genre
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 border-transparent text-white shadow-[0_4px_15px_rgba(139,92,246,0.3)]'
                    : 'bg-[#0a0814] border-white/5 text-gray-400 hover:text-white hover:border-violet-500/30'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

        </div>

        {/* Live Grid */}
        <div className="min-h-[300px] relative">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0b0816]/70 p-4 overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:shadow-[0_4px_30px_rgba(139,92,246,0.15)] flex-1"
                  >
                    {/* Event Background Ambient Gradient */}
                    <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${event.imageAccent} opacity-40 group-hover:opacity-60 transition-opacity`}></div>

                    {/* Card Header details */}
                    <div className="flex items-start justify-between gap-2 relative">
                      {/* Left Badge status tag */}
                      {event.statusTag && (
                        <span className={`rounded-md px-2.5 py-0.5 text-[8px] font-bold tracking-wider ${
                          event.statusTag === 'DESTACADO' || event.statusTag === 'PREMIUM'
                            ? 'bg-violet-600/30 text-violet-300 border border-violet-500/20'
                            : event.statusTag === 'ÚLTIMAS'
                            ? 'bg-rose-600/30 text-rose-300 border border-rose-500/20'
                            : 'bg-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/20'
                        }`}>
                          {event.statusTag}
                        </span>
                      )}
                      
                      {/* Calendar Date floating Box */}
                      <div className="ml-auto rounded-xl bg-black/40 border border-white/10 px-3 py-1.5 flex flex-col items-center select-none shrink-0 self-start">
                        <span className="font-mono text-sm font-bold text-white leading-tight">
                          {event.date.split(' ')[0]}
                        </span>
                        <span className="font-mono text-[8px] uppercase font-bold text-gray-400 mt-0.5 tracking-wider">
                          {event.date.split(' ')[1]}
                        </span>
                      </div>
                    </div>

                    {/* Card Main content info */}
                    <div className="text-left mt-6">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#a855f7]/90 font-bold">
                        <span>{event.genre}</span>
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-600"></span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3 inline text-gray-500" />
                          {event.time.split(' ')[0]}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white mt-1.5 group-hover:neon-text-glow leading-snug">
                        {event.title}
                      </h3>

                      <p className="font-sans text-[11px] text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-4 font-semibold">
                        <MapPin className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Card Footer controls */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-5">
                      <div className="text-left">
                        <p className="text-[10px] text-gray-500 font-semibold uppercase">Desde</p>
                        <p className="font-display text-base font-extrabold text-white">
                          €{event.price}
                        </p>
                      </div>

                      <button
                        onClick={() => onSelectEvent(event)}
                        className="cursor-pointer rounded-full bg-violet-600/35 hover:bg-violet-600 border border-violet-500/30 hover:border-transparent py-2 px-5 text-xs font-bold text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                      >
                        Comprar
                      </button>
                    </div>

                    <div className="absolute -inset-1 -z-20 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-violet-600/10 to-fuchsia-600/10 blur-xl transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Empty search state
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center p-16 text-center text-gray-400 border border-dashed border-white/10 rounded-2xl"
              >
                <div className="p-4 rounded-full bg-[#0c0a15] border border-white/5 mb-4 text-violet-400">
                  <SlidersHorizontal className="h-8 w-8 animate-pulse" />
                </div>
                <h4 className="font-display text-lg font-semibold text-white">No se encontraron eventos</h4>
                <p className="font-sans text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                  Prueba cambiando el género, la ciudad o realiza una búsqueda más general para descubrir otras experiencias de inmediato.
                </p>
                <button
                  onClick={() => {
                    setActiveGenre('Todos');
                    setActiveCity('Todas');
                    setSearchQuery('');
                  }}
                  className="cursor-pointer border border-violet-500/30 bg-violet-950/20 text-violet-300 rounded-full py-2 px-5 text-xs font-bold mt-5 hover:bg-violet-900/30 transition-colors"
                >
                  Restablecer filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
