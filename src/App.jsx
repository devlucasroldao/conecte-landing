import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Waves, Users, Zap, MapPin, Star, ChevronDown } from "lucide-react";
import logoConecte from "../logo-conecte.svg";

export default function ConecteLanding() {
  const [bairro, setBairro] = useState("");

  const numeroWhats = "5551996954462"; // ← Troque pelo número real

  const handleWhats = (mensagem) => {
    window.open(
      `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
    );
  };

  const plans = [
    { velocidade: "300", preco: "99,90", destaque: false },
    { velocidade: "500", preco: "109,90", destaque: true },
    { velocidade: "600", preco: "119,90", destaque: false },
    { velocidade: "700", preco: "129,90", destaque: false },
    { velocidade: "800", preco: "149,90", destaque: false },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logoConecte} alt="Conecte Telecom" className="h-12 w-auto" />
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#planos" className="hover:text-[#ffde59] transition">
              Planos
            </a>
            <a href="#sobre" className="hover:text-[#ffde59] transition">
              Quem Somos
            </a>
            <a href="#cobertura" className="hover:text-[#ffde59] transition">
              Cobertura
            </a>
          </div>

          <button
            onClick={() =>
              handleWhats("Olá! Quero falar com a Conecte Telecom")
            }
            className="bg-[#ffde59] text-black font-semibold px-7 py-3 rounded-2xl flex items-center gap-2 hover:bg-yellow-300 transition"
          >
            <Phone size={20} /> Falar no WhatsApp
          </button>
        </div>
      </nav>

      {/* HERO - Muito mais forte que a RMS */}
      <section className="relative min-h-screen flex items-center pt-20 bg-[url('https://images.unsplash.com/photo-1519046904884-53103b34b206')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/20">
                <Waves className="text-[#ffde59]" /> Feita por quem é de Arroio
                do Sal
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-none mb-6">
                Internet com{" "}
                <span className="text-[#ffde59]">jeito de praia</span>.
              </h1>

              <p className="text-2xl text-zinc-200 mb-10">
                Fibra óptica de verdade, suporte humano e conexão estável.
                Porque aqui a gente se conhece.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("planos")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-[#0a7ee2] hover:bg-blue-600 text-lg font-semibold px-10 py-5 rounded-3xl transition"
                >
                  Ver nossos planos
                </button>
                <button
                  onClick={() =>
                    handleWhats("Quero consultar cobertura no meu bairro")
                  }
                  className="border-2 border-white/70 hover:border-white text-lg font-semibold px-10 py-5 rounded-3xl transition"
                >
                  Consultar Cobertura
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cobertura - Inspirado na RMS mas mais bonito */}
      <section id="cobertura" className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Atendemos de Loteamento Esmeralda até Praia Azul
          </h2>
          <p className="text-zinc-400 mb-10">
            Toda a região com fibra óptica 100%
          </p>

          <input
            type="text"
            placeholder="Digite seu bairro ou rua..."
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            className="w-full max-w-md mx-auto bg-zinc-800 border border-white/10 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-[#ffde59]"
          />
          <button
            onClick={() =>
              handleWhats(
                `Quero saber se atendemos ${bairro || "minha região"}`,
              )
            }
            className="mt-4 bg-[#ffde59] text-black font-bold px-10 py-4 rounded-2xl text-lg hover:bg-yellow-300"
          >
            Verificar minha cobertura
          </button>
        </div>
      </section>

      {/* Planos - Melhorados */}
      <section id="planos" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold">Escolha sua velocidade</h2>
            <p className="text-xl text-zinc-400 mt-3">
              Instalação grátis • Equipamento em comodato • Wi-Fi 6
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className={`rounded-3xl p-8 border transition-all ${p.destaque ? "border-[#ffde59] bg-zinc-900 scale-105" : "border-white/10"}`}
              >
                {p.destaque && (
                  <div className="bg-[#ffde59] text-black text-center py-1 rounded-t-3xl -mt-8 mb-6 font-bold">
                    MAIS RECOMENDADO
                  </div>
                )}

                <div className="text-center">
                  <span className="text-7xl font-bold">{p.velocidade}</span>
                  <span className="text-3xl text-zinc-400">MB</span>
                </div>
                <div className="text-center mt-1 mb-8">
                  <span className="text-5xl font-bold">R$ {p.preco}</span>
                </div>

                <ul className="space-y-4 text-zinc-300">
                  <li>✓ Upload simétrico</li>
                  <li>✓ Wi-Fi 6 de última geração</li>
                  <li>✓ Suporte local todos os dias</li>
                  <li>✓ Instalação grátis</li>
                </ul>

                <button
                  onClick={() =>
                    handleWhats(`Quero o plano de ${p.velocidade}MB`)
                  }
                  className={`w-full mt-10 py-5 rounded-2xl font-bold text-lg ${p.destaque ? "bg-[#ffde59] text-black" : "bg-white/10 hover:bg-white/20"}`}
                >
                  Quero este plano
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Veranistas + Diferenciais */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-zinc-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Veranista em Arroio do Sal?
          </h2>
          <p className="text-2xl text-blue-200">
            Internet rápida desde o primeiro dia da temporada. Sem estresse.
          </p>
          <button
            onClick={() =>
              handleWhats("Sou veranista e quero internet para a temporada")
            }
            className="mt-10 bg-white text-black font-bold text-xl px-14 py-6 rounded-3xl hover:scale-105 transition"
          >
            Reservar para o Verão →
          </button>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-28 bg-black text-center">
        <h2 className="text-6xl font-bold max-w-2xl mx-auto leading-tight">
          Conexão feita por quem vive aqui, pra quem ama viver aqui.
        </h2>
        <button
          onClick={() => handleWhats("Quero contratar a Conecte Telecom")}
          className="mt-12 bg-[#ffde59] text-black text-2xl font-bold px-16 py-8 rounded-3xl hover:scale-105 transition"
        >
          Falar com a gente agora
        </button>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center mb-14">
            <img src={logoConecte} alt="Conecte Telecom" className="h-16 w-auto mb-8" />
            <h2 className="text-4xl font-bold text-center">Perguntas Frequentes</h2>
            <p className="text-zinc-400 mt-3 text-center">Tudo que você precisa saber antes de assinar</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Qual é o prazo de fidelidade?",
                a: "Não temos fidelidade! Você pode cancelar quando quiser, sem multa.",
              },
              {
                q: "A instalação é realmente gratuita?",
                a: "Sim, a instalação é 100% gratuita. O equipamento fica em comodato durante o contrato.",
              },
              {
                q: "O Wi-Fi funciona para toda a casa?",
                a: "Instalamos roteadores Wi-Fi 6 de última geração, projetados para cobrir residências com ótimo sinal em todos os cômodos.",
              },
              {
                q: "Sou veranista, consigo internet só na temporada?",
                a: "Sim! Temos planos flexíveis para veranistas. Entre em contato pelo WhatsApp e a gente resolve.",
              },
              {
                q: "Como funciona o suporte técnico?",
                a: "Nosso suporte é local e humano, disponível todos os dias. Você fala com alguém de Arroio do Sal, não com um robô.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/10 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-3">
              <img src={logoConecte} alt="Conecte Telecom" className="h-12 w-auto" />
              <p className="text-zinc-400 text-sm max-w-xs text-center md:text-left">
                Internet de fibra óptica em Arroio do Sal. Feita por quem é daqui.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 text-zinc-400 text-sm">
              <span className="text-white font-semibold mb-1">Atendimento</span>
              <button
                onClick={() => handleWhats("Olá! Quero falar com a Conecte Telecom")}
                className="hover:text-[#ffde59] transition"
              >
                WhatsApp: (51) 99695-4462
              </button>
              <span>Arroio do Sal — RS</span>
            </div>

            <div className="flex flex-col items-center gap-2 text-zinc-400 text-sm">
              <span className="text-white font-semibold mb-1">Links</span>
              <a href="#planos" className="hover:text-[#ffde59] transition">Planos</a>
              <a href="#cobertura" className="hover:text-[#ffde59] transition">Cobertura</a>
              <a href="#faq" className="hover:text-[#ffde59] transition">Perguntas Frequentes</a>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 text-center text-zinc-600 text-xs">
            © {new Date().getFullYear()} Conecte Telecom. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-lg hover:bg-white/5 transition"
      >
        {question}
        <ChevronDown
          size={20}
          className={`text-[#ffde59] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-zinc-400 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}
