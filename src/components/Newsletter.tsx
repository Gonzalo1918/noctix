import { useState, FormEvent } from 'react';
import { Mail, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, introduce una dirección de correo válida.');
      return;
    }
    
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="px-4 py-12 relative overflow-hidden">
      {/* Decorative backing glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-60 w-80 rounded-full bg-violet-600/10 blur-[80px]"></div>

      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-[#090715] to-[#04020a] p-8 md:p-10 text-center relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 max-w-lg mx-auto"
              >
                {/* Glowing Spark icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 mb-1 select-none animate-bounce">
                  <Sparkles className="h-5 w-5" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none">
                  No te pierdas nada
                </h3>
                
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                  Suscríbete y recibe las mejores ofertas y preventa exclusiva de eventos de la ciudad.
                </p>

                {/* Subscription input form */}
                <form 
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col sm:flex-row items-center gap-3 mt-4"
                >
                  <div className="relative w-full">
                    <input
                      type="email"
                      required
                      placeholder="Introduce tu email aquí..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full bg-[#0c0a15] border border-white/5 text-gray-200 placeholder-gray-600 rounded-full px-5 py-3.5 pl-11 text-xs focus:outline-none focus:border-violet-500 transition-all font-sans"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  </div>

                  <button
                    type="submit"
                    className="cursor-pointer w-full sm:w-auto rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:brightness-110 shrink-0 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Suscribirse</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>

                {error && (
                  <p className="text-xs text-rose-400 mt-1 self-start sm:self-center font-medium">{error}</p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 max-w-sm mx-auto py-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 border border-green-500/25 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)] animate-pulse">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                
                <h3 className="font-display text-lg font-extrabold text-white">¡Ya estás en lista!</h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed font-normal">
                  Hemos registrado correctamente tu correo <strong className="text-gray-300">{email}</strong>. Pronto recibirás lanzamientos, noticias y preventas VIP con pases prioritarios.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="cursor-pointer border border-white/5 bg-[#0c0a15] rounded-full py-2 px-5 text-[10px] text-gray-400 font-bold hover:text-white mt-1 transition-colors"
                >
                  Volver a suscribirse
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
