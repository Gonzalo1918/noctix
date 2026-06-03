import { Instagram, Twitter, Ticket, Laptop, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#04020a] border-t border-white/5 pt-16 pb-8 px-6 font-sans">
      <div className="mx-auto max-w-5xl">
        
        {/* Main Grid directories */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left mb-12">
          
          {/* Logo brand and desc */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                <Ticket className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-wider text-white">
                Noctix<span className="text-fuchsia-500">.</span>
              </span>
            </div>

            <p className="font-sans text-xs text-gray-400 leading-relaxed font-normal">
              La plataforma líder en venta de entradas para eventos nocturnos. Experiencias únicas que se quedan grabadas en tu memoria para siempre.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3.5 mt-2">
              <a 
                href="#_" 
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-violet-600/25 border border-white/5 hover:border-violet-500/25 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#_" 
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-violet-600/25 border border-white/5 hover:border-violet-500/25 transition-all duration-300"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#_" 
                aria-label="Web"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-violet-600/25 border border-white/5 hover:border-violet-500/25 transition-all duration-300"
              >
                <Laptop className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Spacer layout */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Directory columns */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-display text-xs font-black text-white uppercase tracking-wider">Eventos</h4>
            <div className="flex flex-col gap-2.5 font-sans text-xs text-gray-400 font-medium">
              <a href="#eventos" className="hover:text-white transition-colors">Electrónica</a>
              <a href="#eventos" className="hover:text-white transition-colors">Reggaetón</a>
              <a href="#eventos" className="hover:text-white transition-colors">En Vivo</a>
              <a href="#eventos" className="hover:text-white transition-colors">Festivales</a>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-display text-xs font-black text-white uppercase tracking-wider">Empresa</h4>
            <div className="flex flex-col gap-2.5 font-sans text-xs text-gray-400 font-medium font-normal">
              <a href="#_" className="hover:text-white transition-colors">Sobre Nosotros</a>
              <a href="#_" className="hover:text-white transition-colors">Contacto</a>
              <a href="#_" className="hover:text-white transition-colors">Trabaja con Nosotros</a>
              <a href="#_" className="hover:text-white transition-colors">Prensa</a>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-display text-xs font-black text-white uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-2.5 font-sans text-xs text-gray-400 font-medium font-normal">
              <a href="#_" className="hover:text-white transition-colors">Términos y Condiciones</a>
              <a href="#_" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#_" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <hr className="border-white/5 mb-6" />

        {/* Bottom copyright line row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>© {currentYear} Noctix. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1.5 text-gray-600 font-sans text-[11px] font-semibold">
            <ShieldCheck className="h-4 w-4 text-green-700/80" />
            <span>Pagos encriptados con protección SSL de 256 bits</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
