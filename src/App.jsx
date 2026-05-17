import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Waves, Zap, Star, ChevronDown,
  Menu, X, Shield, Wifi, Headphones,
  Instagram, Facebook, CheckCircle2,
} from "lucide-react";
import logoConecte from "../logo-conecte.svg";

// Paleta de azuis
// #040b14 — navy quase preto (base mais escura)
// #060f1e — navy escuro (seções primárias)
// #0a1628 — navy médio (seções secundárias)
// #0d1f35 — navy elevado (cards / superfícies)
// #162a45 — navy claro (hover de cards)
// #0a7ee2 — azul acento (CTAs secundários)
// #ffde59 — amarelo acento primário

const NUMERO_WHATS = "5551996954462";

function abrirWhats(mensagem) {
  window.open(
    `https://wa.me/${NUMERO_WHATS}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}

export default function ConecteLanding() {
  const [bairro, setBairro] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const plans = [
    { velocidade: "300", preco: "99,90", destaque: false },
    { velocidade: "500", preco: "109,90", destaque: true },
    { velocidade: "600", preco: "119,90", destaque: false },
    { velocidade: "700", preco: "129,90", destaque: false },
    { velocidade: "800", preco: "149,90", destaque: false },
  ];

  const navLinks = [
    { label: "Planos", href: "#planos" },
    { label: "Cobertura", href: "#cobertura" },
    { label: "Quem Somos", href: "#sobre" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return (
    <div className="bg-[#060f1e] text-white min-h-screen">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#040b14]/90 backdrop-blur-md border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <img src={logoConecte} alt="Conecte Telecom" className="h-12 w-auto" />

          <div className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-blue-100/80 hover:text-[#ffde59] transition">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => abrirWhats("Olá! Quero falar com a Conecte Telecom")}
              className="hidden sm:flex bg-[#ffde59] text-black font-semibold px-7 py-3 rounded-2xl items-center gap-2 hover:bg-yellow-300 transition"
            >
              <Phone size={18} /> Falar no WhatsApp
            </button>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a1628] border-t border-blue-900/40 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-medium text-blue-100/80 hover:text-[#ffde59] transition py-1"
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  onClick={() => abrirWhats("Olá! Quero falar com a Conecte Telecom")}
                  className="bg-[#ffde59] text-black font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 w-fit mt-2 hover:bg-yellow-300 transition"
                >
                  <Phone size={18} /> Falar no WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 bg-[url('https://images.unsplash.com/photo-1519046904884-53103b34b206')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040b14]/40 via-[#060f1e]/75 to-[#060f1e]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-900/30 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-blue-700/40">
                <Waves className="text-[#ffde59]" /> Feita por quem é de Arroio do Sal
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-none mb-6">
                Internet com{" "}
                <span className="text-[#ffde59]">jeito de praia</span>.
              </h1>

              <p className="text-2xl text-blue-100/90 mb-10">
                Fibra óptica de verdade, suporte humano e conexão estável.
                Porque aqui a gente se conhece.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document.getElementById("planos").scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-[#0a7ee2] hover:bg-blue-500 text-lg font-semibold px-10 py-5 rounded-3xl transition shadow-lg shadow-blue-900/40"
                >
                  Ver nossos planos
                </button>
                <button
                  onClick={() => abrirWhats("Quero consultar cobertura no meu bairro")}
                  className="border-2 border-blue-400/60 hover:border-blue-300 text-lg font-semibold px-10 py-5 rounded-3xl transition"
                >
                  Consultar Cobertura
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-20 bg-gradient-to-b from-[#060f1e] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">Por que escolher a Conecte?</h2>
            <p className="text-blue-300/60 mt-3">Mais do que internet — uma empresa que vive onde você vive</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Wifi className="text-[#ffde59]" size={32} />,
                titulo: "Fibra Óptica Pura",
                texto: "Velocidade real, sem quedas. Upload e download simétricos.",
              },
              {
                icon: <Shield className="text-[#ffde59]" size={32} />,
                titulo: "Sem Fidelidade",
                texto: "Cancele quando quiser, sem multa. Ficamos porque você quer, não porque é obrigado.",
              },
              {
                icon: <Headphones className="text-[#ffde59]" size={32} />,
                titulo: "Suporte Humano",
                texto: "Atendimento local, todos os dias. Você fala com alguém de Arroio do Sal.",
              },
              {
                icon: <Zap className="text-[#ffde59]" size={32} />,
                titulo: "Instalação Grátis",
                texto: "Sem custo de instalação. Roteador Wi-Fi 6 em comodato.",
              },
            ].map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0d1f35] border border-blue-800/40 rounded-3xl p-8 hover:border-[#ffde59]/50 hover:bg-[#162a45] transition"
              >
                <div className="mb-4">{d.icon}</div>
                <h3 className="text-xl font-bold mb-2">{d.titulo}</h3>
                <p className="text-blue-200/60 text-sm leading-relaxed">{d.texto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-gradient-to-r from-[#0a5cb8] via-[#0a7ee2] to-[#0a5cb8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { numero: "500+", label: "Clientes ativos" },
              { numero: "98%", label: "Uptime garantido" },
              { numero: "5+", label: "Anos no mercado" },
              { numero: "12", label: "Bairros atendidos" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-bold">{s.numero}</div>
                <div className="text-blue-100/80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-24 bg-gradient-to-b from-[#040b14] to-[#060f1e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold">Escolha sua velocidade</h2>
            <p className="text-xl text-blue-300/60 mt-3">
              Instalação grátis • Equipamento em comodato • Wi-Fi 6
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className={`rounded-3xl p-8 border transition-all ${
                  p.destaque
                    ? "border-[#ffde59] bg-[#0d1f35] scale-105 shadow-xl shadow-blue-950/60"
                    : "border-blue-800/40 bg-[#0a1628] hover:bg-[#0d1f35]"
                }`}
              >
                {p.destaque && (
                  <div className="bg-[#ffde59] text-black text-center py-1 rounded-t-3xl -mt-8 mb-6 font-bold">
                    MAIS RECOMENDADO
                  </div>
                )}

                <div className="text-center">
                  <span className="text-7xl font-bold">{p.velocidade}</span>
                  <span className="text-3xl text-blue-300/60"> Mbps</span>
                </div>
                <div className="text-center mt-1 mb-8">
                  <span className="text-5xl font-bold">R$ {p.preco}</span>
                  <span className="text-blue-300/60">/mês</span>
                </div>

                <ul className="space-y-3 text-blue-100/80">
                  {[
                    "Upload simétrico",
                    "Wi-Fi 6 de última geração",
                    "Suporte local todos os dias",
                    "Instalação grátis",
                    "Sem fidelidade",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#ffde59] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => abrirWhats(`Quero o plano de ${p.velocidade}Mbps`)}
                  className={`w-full mt-10 py-5 rounded-2xl font-bold text-lg transition ${
                    p.destaque
                      ? "bg-[#ffde59] text-black hover:bg-yellow-300"
                      : "bg-blue-800/40 hover:bg-blue-700/50 border border-blue-700/40"
                  }`}
                >
                  Quero este plano
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cobertura */}
      <section id="cobertura" className="py-20 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Atendemos de Loteamento Esmeralda até Praia Azul
          </h2>
          <p className="text-blue-300/60 mb-10">Toda a região com fibra óptica 100%</p>

          <input
            type="text"
            placeholder="Digite seu bairro ou rua..."
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            className="w-full max-w-md mx-auto block bg-[#0d1f35] border border-blue-800/50 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-[#ffde59] placeholder:text-blue-400/40"
          />
          <button
            onClick={() =>
              abrirWhats(`Quero saber se atendemos ${bairro || "minha região"}`)
            }
            className="mt-4 bg-[#ffde59] text-black font-bold px-10 py-4 rounded-2xl text-lg hover:bg-yellow-300 transition"
          >
            Verificar minha cobertura
          </button>
        </div>
      </section>

      {/* Quem Somos */}
      <section id="sobre" className="py-24 bg-gradient-to-b from-[#060f1e] to-[#040b14]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Uma empresa de Arroio do Sal,{" "}
                <span className="text-[#ffde59]">para Arroio do Sal</span>.
              </h2>
              <p className="text-blue-100/80 text-lg leading-relaxed mb-6">
                A Conecte Telecom nasceu aqui. Somos moradores da cidade que decidiram
                trazer internet de verdade para quem merece — com atendimento que
                conhece o cliente pelo nome.
              </p>
              <p className="text-blue-300/60 leading-relaxed">
                Enquanto as grandes operadoras mandam você esperar na fila ou falar com
                robôs, a gente resolve no WhatsApp. Sem enrolação, sem fidelidade, sem
                surpresa na fatura.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Time 100% local",
                "Atendimento no WhatsApp",
                "Sem letra miúda",
                "Sem robô de atendimento",
                "Instalação no mesmo dia*",
                "Sem fidelidade",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#0d1f35] border border-blue-800/40 rounded-2xl p-4">
                  <CheckCircle2 className="text-[#ffde59] shrink-0" size={22} />
                  <span className="text-sm font-medium text-blue-100/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-blue-900/80 text-xs mt-8">* Sujeito à disponibilidade de técnico.</p>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">O que nossos clientes dizem</h2>
            <p className="text-blue-300/60 mt-3">Pessoas reais de Arroio do Sal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                nome: "Carlos A.",
                bairro: "Praia Azul",
                texto:
                  "Mudei pra Conecte depois de anos sofrendo com queda de sinal. Agora trabalho home office sem problema nenhum. Recomendo demais!",
              },
              {
                nome: "Fernanda M.",
                bairro: "Loteamento Esmeralda",
                texto:
                  "Atendimento incrível. Tive um problema às 8h da manhã de sábado e já tinham resolvido antes das 10h. Isso é empresa local de verdade!",
              },
              {
                nome: "Roberto S.",
                bairro: "Centro",
                texto:
                  "Sou veranista há 10 anos em Arroio do Sal. Pela primeira vez tenho internet estável na temporada. Valeu cada centavo.",
              },
              {
                nome: "Juliane P.",
                bairro: "Balneário Arroio do Sal",
                texto:
                  "Preço justo e internet que funciona de verdade. Sem fidelidade foi o que me convenceu a trocar. Melhor decisão.",
              },
              {
                nome: "Marcelo T.",
                bairro: "Praia dos Arnos",
                texto:
                  "Instalação foi rápida e o técnico super atencioso. Wi-Fi chegando em todos os cantos da casa agora.",
              },
              {
                nome: "Ana C.",
                bairro: "Loteamento Esmeralda",
                texto:
                  "Minha família toda assinou. O plano de 500Mbps dá conta de 4 pessoas usando ao mesmo tempo sem travamento.",
              },
            ].map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#060f1e] border border-blue-900/40 rounded-3xl p-6 hover:border-blue-700/50 hover:bg-[#0a1628] transition"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} className="text-[#ffde59] fill-[#ffde59]" />
                  ))}
                </div>
                <p className="text-blue-100/80 leading-relaxed mb-6">"{d.texto}"</p>
                <div>
                  <div className="font-semibold">{d.nome}</div>
                  <div className="text-blue-400/60 text-sm">{d.bairro}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Veranistas */}
      <section className="py-20 bg-gradient-to-br from-[#0a1e3d] via-[#0d2952] to-[#060f1e]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Veranista em Arroio do Sal?</h2>
          <p className="text-2xl text-blue-200/80">
            Internet rápida desde o primeiro dia da temporada. Sem estresse.
          </p>
          <button
            onClick={() => abrirWhats("Sou veranista e quero internet para a temporada")}
            className="mt-10 bg-[#ffde59] text-black font-bold text-xl px-14 py-6 rounded-3xl hover:scale-105 transition shadow-lg shadow-yellow-900/30"
          >
            Reservar para o Verão →
          </button>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-28 bg-gradient-to-b from-[#040b14] to-[#060f1e] text-center">
        <h2 className="text-6xl font-bold max-w-2xl mx-auto leading-tight">
          Conexão feita por quem vive aqui, pra quem ama viver aqui.
        </h2>
        <button
          onClick={() => abrirWhats("Quero contratar a Conecte Telecom")}
          className="mt-12 bg-[#ffde59] text-black text-2xl font-bold px-16 py-8 rounded-3xl hover:scale-105 transition shadow-xl shadow-yellow-900/20"
        >
          Falar com a gente agora
        </button>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#060f1e]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center mb-14">
            <img src={logoConecte} alt="Conecte Telecom" className="h-16 w-auto mb-8" />
            <h2 className="text-4xl font-bold text-center">Perguntas Frequentes</h2>
            <p className="text-blue-300/60 mt-3 text-center">Tudo que você precisa saber antes de assinar</p>
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
              {
                q: "Quanto tempo leva a instalação?",
                a: "Em geral, a instalação é agendada e feita no mesmo dia ou no dia seguinte, dependendo da disponibilidade do técnico na sua região.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040b14] border-t border-blue-900/40 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <img src={logoConecte} alt="Conecte Telecom" className="h-12 w-auto mb-4" />
              <p className="text-blue-300/50 text-sm max-w-xs leading-relaxed">
                Internet de fibra óptica em Arroio do Sal. Feita por quem é daqui, para quem vive aqui.
              </p>
              <div className="flex gap-3 mt-5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0d1f35] hover:bg-[#162a45] border border-blue-800/40 p-3 rounded-xl transition"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-blue-300/70" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0d1f35] hover:bg-[#162a45] border border-blue-800/40 p-3 rounded-xl transition"
                  aria-label="Facebook"
                >
                  <Facebook size={18} className="text-blue-300/70" />
                </a>
              </div>
            </div>

            <div>
              <span className="text-white font-semibold mb-4 block">Navegação</span>
              <div className="flex flex-col gap-2 text-blue-300/50 text-sm">
                <a href="#planos" className="hover:text-[#ffde59] transition">Planos</a>
                <a href="#cobertura" className="hover:text-[#ffde59] transition">Cobertura</a>
                <a href="#sobre" className="hover:text-[#ffde59] transition">Quem Somos</a>
                <a href="#faq" className="hover:text-[#ffde59] transition">Perguntas Frequentes</a>
              </div>
            </div>

            <div>
              <span className="text-white font-semibold mb-4 block">Contato</span>
              <div className="flex flex-col gap-2 text-blue-300/50 text-sm">
                <button
                  onClick={() => abrirWhats("Olá! Quero falar com a Conecte Telecom")}
                  className="hover:text-[#ffde59] transition text-left"
                >
                  WhatsApp: (51) 99695-4462
                </button>
                <span>Arroio do Sal — RS</span>
                <span className="text-blue-900 text-xs mt-2">CNPJ: XX.XXX.XXX/0001-XX</span>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-900/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-blue-900 text-xs">
            <span>© {new Date().getFullYear()} Conecte Telecom. Todos os direitos reservados.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition">Política de Privacidade</a>
              <a href="#" className="hover:text-blue-400 transition">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <button
        onClick={() => abrirWhats("Olá! Vim pelo site e quero saber mais sobre os planos")}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20b358] text-white font-semibold px-5 py-4 rounded-full shadow-2xl shadow-green-900/50 transition"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="hidden sm:inline">Falar no WhatsApp</span>
      </button>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-blue-900/40 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-lg hover:bg-blue-900/20 transition"
      >
        {question}
        <ChevronDown
          size={20}
          className={`text-[#ffde59] transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-blue-200/60 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
