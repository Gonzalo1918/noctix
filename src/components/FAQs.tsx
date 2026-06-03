import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS_DATA } from '../data';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-4 py-16 bg-[#03000b] scroll-mt-24">
      <div className="mx-auto max-w-4xl">
        
        {/* Title Section header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <p className="font-mono text-[10px] font-bold tracking-widest text-[#a855f7] uppercase">Preguntas frecuentes</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Resolvemos tus dudas
          </h2>
          <div className="h-1 w-12 rounded bg-gradient-to-r from-violet-600 to-fuchsia-600 mt-1"></div>
        </div>

        {/* Accordions Container */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-violet-500/20 bg-violet-950/10'
                    : 'border-white/5 bg-[#090715]/40 hover:border-white/10'
                }`}
              >
                {/* Trigger Button bar */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="cursor-pointer w-full flex items-center justify-between gap-4 p-5 text-left focus:outline-none"
                >
                  <p className="font-display text-xs sm:text-sm font-extrabold text-white group-hover:text-violet-300 transition-colors">
                    {faq.question}
                  </p>
                  
                  {/* Rotate Arrow indicator */}
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-gray-400 group-hover:text-white transition-all shrink-0 duration-300 ${
                    isOpen ? 'rotate-180 bg-violet-600/20 text-violet-300' : ''
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Smooth Expandable collapsible box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-left border-t border-white/5">
                        <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
