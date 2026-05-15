import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Star } from 'lucide-react';

const plans = [
  { speed: "60", price: "89,90", highlight: false },
  { speed: "300", price: "99,90", highlight: false },
  { speed: "500", price: "109,90", highlight: true },
  { speed: "600", price: "119,90", highlight: false },
  { speed: "700", price: "129,90", highlight: false },
  { speed: "800", price: "149,90", highlight: false },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bairro, setBairro] = useState("");

  const handleWhatsApp = (message) => {
    const phone = "5551996954462"; // Troque pelo número real
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-zinc-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0a7ee2] rounded-xl flex items-center justify-center text-2xl font-bold">C</div>
            <div>
              <span className="font-bold text-2xl tracking-tight">Conecte</span>
              <span className="text-[#ffde59] text-sm block -mt-1">Telecom</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#planos" className="hover:text-[#ffde59] transition">Planos</a>
            <a href="#diferenciais" className="hover:text-[#ffde59] transition">Por que Conecte</a>
            <a href="#veranistas" className="hover:text-[#ffde59] transition">Veranistas</a>
            <a href="#faq" className="hover:text-[#ffde59] transition">Dúvidas</a>
          </div>

          <button
            onClick={() => handleWhatsApp("Olá! Quero conhecer a Conecte Telecom")}
            className="hidden md:flex items-center gap-2 bg-[#ffde59] text-black font-semibold px-6 py-3 rounded-2xl hover:bg-yellow-300 transition"
          >
            <Phone className="w-5 h-5" />
            Falar no WhatsApp
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen pt-20 relative flex items-center bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm mb-6 border border-white/20">
                Feita por quem vive em Arroio do Sal 🌊
              </span>
              
              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                Internet com <span className="text-[#ffde59]">alma</span> de praia.
              </h1>
              
              <p className="text-xl text-zinc-300 mb-10">
                Fibra óptica estável, suporte humano e conexão de verdade. 
                Porque aqui a gente se conhece pelo nome.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('planos').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#0a7ee2] hover:bg-blue-600 transition text-lg font-semibold px-10 py-5 rounded-3xl"
                >
                  Ver planos
                </button>
                
                <button
                  onClick={() => handleWhatsApp("Olá! Quero consultar cobertura na minha região")}
                  className="border border-white/50 hover:border-white/80 transition text-lg font-semibold px-10 py-5 rounded-3xl flex items-center justify-center gap-3"
                >
                  Consultar cobertura
                </button>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Instalação grátis
                </div>
                <div>Suporte todos os dias</div>
                <div>Equipe local</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mockup flutuante */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:block absolute bottom-10 right-10 bg-zinc-900 p-4 rounded-3xl shadow-2xl border border-white/10"
        >
          <img src="https://picsum.photos/id/1015/380/520" alt="Velocidade Conecte" className="rounded-2xl" />
        </motion.div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Conexão com cara de gente</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🌊", title: "Feita aqui", desc: "Nascemos em Arroio do Sal e entendemos o ritmo da nossa cidade" },
              { icon: "🧑‍🔧", title: "Suporte humano", desc: "Atendimento real, sem robô. Técnico da cidade na sua porta" },
              { icon: "⚡", title: "Internet de verdade", desc: "Fibra 100% com velocidade que você realmente usa" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-zinc-800/50 border border-white/10 rounded-3xl p-10 hover:border-[#ffde59]/30 transition"
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-3xl font-semibold mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Escolha sua velocidade</h2>
            <p className="text-xl text-zinc-400">Instalação grátis • Equipamentos em comodato • Fidelidade 12 meses</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatePresence>
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className={`relative rounded-3xl p-8 border transition-all ${plan.highlight ? 'border-[#ffde59] scale-105 shadow-2xl shadow-yellow-500/20' : 'border-white/10'}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ffde59] text-black font-bold px-6 py-1 rounded-full text-sm">
                      MAIS ESCOLHIDO
                    </div>
                  )}

                  <div className="text-center">
                    <span className="text-6xl font-bold">{plan.speed}</span>
                    <span className="text-2xl font-medium text-zinc-400">MB</span>
                  </div>
                  
                  <div className="text-center mt-2 mb-8">
                    <span className="text-5xl font-bold">R$ {plan.price}</span>
                    <span className="text-zinc-500">/mês</span>
                  </div>

                  <ul className="space-y-4 mb-10 text-zinc-300">
                    <li className="flex items-center gap-3">✓ Wi-Fi 6 incluso</li>
                    <li className="flex items-center gap-3">✓ Upload simétrico</li>
                    <li className="flex items-center gap-3">✓ Suporte local prioritário</li>
                    <li className="flex items-center gap-3">✓ Sem surpresas na fatura</li>
                  </ul>

                  <button
                    onClick={() => handleWhatsApp(`Quero o plano de ${plan.speed}MB`)}
                    className={`w-full py-5 rounded-2xl font-semibold text-lg transition ${plan.highlight ? 'bg-[#ffde59] text-black hover:bg-yellow-300' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    Quero este plano
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SEÇÃO VERANISTAS */}
      <section id="veranistas" className="py-24 bg-gradient-to-br from-[#0a7ee2] to-blue-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Vem passar o verão em Arroio do Sal?</h2>
          <p className="text-2xl mb-12 text-blue-100">
            Tenha internet rápida desde o primeiro dia da temporada. 
            Sem fila, sem burocracia, só alegria.
          </p>
          
          <button
            onClick={() => handleWhatsApp("Olá! Sou veranista e quero internet para a temporada")}
            className="bg-white text-black text-xl font-semibold px-12 py-6 rounded-3xl hover:scale-105 transition"
          >
            Reservar internet para o verão →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Dúvidas frequentes</h2>
          
          <div className="space-y-6">
            {[
              ["Quanto tempo demora a instalação?", "Normalmente entre 24h e 72h úteis após a aprovação."],
              ["Vocês atendem o Loteamento Esmeralda até Praia Azul?", "Sim! Atendemos toda essa região com fibra óptica."],
              ["Tem que ficar preso 12 meses?", "Sim, mas você pode cancelar pagando apenas o proporcional."],
            ].map(([q, a], i) => (
              <div key={i} className="bg-zinc-800/50 rounded-2xl p-8">
                <p className="font-semibold text-lg mb-3">{q}</p>
                <p className="text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-black text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-6xl font-bold leading-tight mb-8">
            Conecte sua casa.<br />
            Conecte sua vida.
          </h2>
          <p className="text-2xl text-zinc-400 mb-12">
            Internet feita por quem é daqui, pra quem ama Arroio do Sal.
          </p>
          
          <button
            onClick={() => handleWhatsApp("Quero contratar a Conecte Telecom!")}
            className="bg-[#ffde59] text-black text-2xl font-bold px-16 py-8 rounded-3xl hover:scale-105 transition"
          >
            Falar com a gente no WhatsApp
          </button>
        </div>
      </section>

      {/* Botão WhatsApp Flutuante */}
      <a
        href="https://wa.me/5551996954462"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition z-50"
      >
        <Phone className="w-8 h-8 text-white" />
      </a>
    </div>
  );
}