import { useState, useEffect } from 'react';
import { Event, PurchasedTicket } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedBanner from './components/FeaturedBanner';
import EventsGrid from './components/EventsGrid';
import CheckoutDrawer from './components/CheckoutDrawer';
import DJsCarousel from './components/DJsCarousel';
import HowItWorks from './components/HowItWorks';
import FAQs from './components/FAQs';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import TicketsWalletModal from './components/TicketsWalletModal';
import { EVENTS_DATA } from './data';

export default function App() {
  // Persistence wallet storage in localStorage
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>(() => {
    try {
      const saved = localStorage.getItem('noctix_wallet_tickets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeHeroTicketId, setActiveHeroTicketId] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  // Sync state items back to storage
  useEffect(() => {
    localStorage.setItem('noctix_wallet_tickets', JSON.stringify(purchasedTickets));
    
    // Auto set the latest purchased ticket as the hero display ticket
    if (purchasedTickets.length > 0 && !activeHeroTicketId) {
      setActiveHeroTicketId(purchasedTickets[purchasedTickets.length - 1].id);
    }
  }, [purchasedTickets, activeHeroTicketId]);

  // Handle successful purchase transaction
  const handlePurchaseSuccess = (newTicket: PurchasedTicket) => {
    setPurchasedTickets((prev) => [...prev, newTicket]);
    setActiveHeroTicketId(newTicket.id);
  };

  // Scroll to targeted visual section with high compatibility
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Select event directly by its ID registry
  const handleSelectEventById = (id: string) => {
    const matched = EVENTS_DATA.find((evt) => evt.id === id);
    if (matched) {
      setSelectedEvent(matched);
    }
  };

  // Set selected ticket to display active in the mobile mockup frame
  const handleSetTicketAsHeroActive = (ticket: PurchasedTicket) => {
    setActiveHeroTicketId(ticket.id);
    // Auto scroll up smoothly to let them see it in action inside the mobile mockup!
    window.scrollTo({ top: 30, behavior: 'smooth' });
    setWalletModalOpen(false);
  };

  // Retrieve matching active ticket object
  const walletActiveTickets = purchasedTickets.filter(t => t.id === activeHeroTicketId);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#03000a] text-gray-100 overflow-x-hidden selection:bg-violet-600/30 selection:text-white">
      {/* Premium subtle glow elements mapping the dark aesthetic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-20 h-[500px] w-full max-w-7xl bg-gradient-to-b from-[#0e071e]/70 to-[#03000a] opacity-90"></div>

      {/* Floating navigation bar */}
      <Header
        purchasedTickets={purchasedTickets}
        onOpenTicketsWallet={() => setWalletModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Hero display block with mobile wallet dashboard */}
      <Hero
        purchasedTickets={walletActiveTickets}
        onScrollToSection={handleScrollToSection}
        onSelectEventById={handleSelectEventById}
      />

      {/* Featured next event timer ribbon banner */}
      <FeaturedBanner 
        onSelectEvent={() => handleSelectEventById('techno-nights')} 
      />

      {/* Grid of concerts, club events and filter tools catalog */}
      <EventsGrid 
        onSelectEvent={(evt) => setSelectedEvent(evt)} 
      />

      {/* Circular interactive artists profile cards section */}
      <DJsCarousel />

      {/* Steps educational infographic block */}
      <HowItWorks />

      {/* Fully responsive FAQs clicking accordion panel */}
      <FAQs />

      {/* Digital newsletter opt-in widget card */}
      <Newsletter />

      {/* Standard copyright and directories footer layout */}
      <Footer />

      {/* Double Drawer sheets modals overlays checkout trigger logic */}
      <CheckoutDrawer
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onPurchaseSuccess={handlePurchaseSuccess}
      />

      {/* Fully custom digital security wallet tickets catalog modal overlays */}
      <TicketsWalletModal
        tickets={purchasedTickets}
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onSetAsHeroActive={handleSetTicketAsHeroActive}
        activeHeroTicketId={activeHeroTicketId}
      />
    </div>
  );
}
