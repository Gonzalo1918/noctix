import { Compass, Ticket, Smartphone } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Elige tu evento',
      description: 'Explora nuestro catálogo de eventos y encuentra el que mejor se adapte a tu estilo.',
      icon: <Compass className="h-5 w-5 text-violet-400" />
    },
    {
      number: '02',
      title: 'Selecciona tus entradas',
      description: 'Elige el tipo de entrada que prefieras: General, VIP o Backstage.',
      icon: <Ticket className="h-5 w-5 text-violet-400" />
    },
    {
      number: '03',
      title: 'Recibe tu entrada digital',
      description: 'Tu entrada llegará a tu email y estará disponible en la app con código QR.',
      icon: <Smartphone className="h-5 w-5 text-violet-400" />
    }
  ];

  return (
    <section id="como-funciona" className="px-4 py-16 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        
        {/* Title Section header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <p className="font-mono text-[10px] font-bold tracking-widest text-[#a855f7] uppercase">¿Cómo funciona?</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            En 3 simples pasos
          </h2>
          <div className="h-1 w-12 rounded bg-gradient-to-r from-violet-600 to-fuchsia-600 mt-1"></div>
        </div>

        {/* Info Grid of three boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Subtle line indicator running behind icons in desktop layouts */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent -z-10"></div>

          {steps.map((step) => (
            <div
              key={step.number}
              className="group rounded-2xl border border-white/5 bg-[#0b0816]/75 p-6 text-left relative overflow-hidden flex flex-col gap-4 hover:border-violet-500/15 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                {/* Glowing Icon holder box */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-950/30 border border-violet-500/25 group-hover:border-violet-500 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.25)] transition-all duration-300 select-none shrink-0">
                  {step.icon}
                </div>

                {/* Big decorative step number */}
                <div className="font-display text-4xl font-black text-white/5 group-hover:text-violet-500/10 transition-colors select-none font-mono">
                  {step.number}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-2">
                <h4 className="font-display text-base font-extrabold text-white">
                  {step.title}
                </h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Glowing card border masks on hover */}
              <div className="absolute -inset-1 -z-20 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-violet-600/5 to-fuchsia-600/5 blur-xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
