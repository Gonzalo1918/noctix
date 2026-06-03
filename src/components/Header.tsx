import { useState } from 'react';
import { Ticket, Menu, X, Sparkles, User, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PurchasedTicket } from '../types';

interface HeaderProps {
  purchasedTickets: PurchasedTicket[];
  onOpenTicketsWallet: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({ 
  purchasedTickets, 
  onOpenTicketsWallet, 
  onScrollToSection 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Eventos', id: 'eventos' },
    { label: 'Artistas', id: 'artistas' },
    { label: 'Cómo Funciona', id: 'como-funciona' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <header className="sticky top-6 inset-x-0 z-50 mx-auto w-[90%] max-w-5xl px-4">
      <div className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-[#0c0a15]/80 px-6 py-3 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
        
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <Ticket className="h-4 w-4 text-white" />
            <div className="absolute -inset-1 -z-10 animate-pulse-slow rounded-lg bg-gradient-to-tr from-violet-600 to-pink-500 opacity-50 blur-sm"></div>
          </div>
          <span className="font-display text-xl font-bold tracking-wider text-white">
            Noctix<span className="text-light-violet text-fuchsia-500">.</span>
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollToSection(item.id)}
              className="font-sans text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer hover:neon-text-glow"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onOpenTicketsWallet}
            className="group relative flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/25 px-4 py-2 text-sm font-semibold text-violet-300 hover:text-white hover:border-violet-400 hover:bg-violet-900/30 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-fuchsia-400 group-hover:animate-spin" />
            <span>Mis Entradas</span>
            {purchasedTickets.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-[10px] font-bold text-white shadow-[0_0_8px_rgba(236,72,153,0.6)]">
                {purchasedTickets.reduce((acc, t) => acc + t.quantity, 0)}
              </span>
            )}
          </button>
          <button 
            onClick={() => onScrollToSection('eventos')}
            className="cursor-pointer rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            Comprar Entradas
          </button>
        </div>

        {/* Mobile menu and wallet controls */}
        <div className="flex md:hidden items-center gap-3">
          {purchasedTickets.length > 0 && (
            <button 
              onClick={onOpenTicketsWallet}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-violet-950/30 text-violet-300 cursor-pointer"
            >
              <Ticket className="h-4.5 w-4.5" />
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-[9px] font-bold text-white">
                {purchasedTickets.reduce((acc, t) => acc + t.quantity, 0)}
              </span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Actions Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-20 flex flex-col gap-4 rounded-3xl border border-white/15 bg-[#0e0c1a] p-6 shadow-2xl z-40"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection(item.id);
                  }}
                  className="w-full rounded-xl py-3 text-left font-sans text-base font-semibold text-gray-300 hover:text-white hover:bg-white/5 px-4 transition-all duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <hr className="border-white/10" />

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTicketsWallet();
                }}
                className="flex w-full items-center justify-between rounded-xl bg-violet-950/20 border border-violet-500/20 px-4 py-3 text-sm font-semibold text-violet-300 hover:bg-violet-950/40 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-fuchsia-400" />
                  Mis Entradas Guardadas
                </span>
                <span className="rounded-full bg-violet-500 px-2.5 py-0.5 text-xs font-bold text-white">
                  {purchasedTickets.reduce((acc, t) => acc + t.quantity, 0)}
                </span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToSection('eventos');
                }}
                className="w-full text-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-bold text-white cursor-pointer"
              >
                Comprar Entradas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
