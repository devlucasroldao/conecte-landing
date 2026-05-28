<div align="center">

<img src="https://raw.githubusercontent.com/devlucasroldao/conecte-landing/main/img/logo-conecte.png" width="180" alt="Conecte Telecom" />

# Conecte Telecom — Landing Page

**Site institucional moderno para provedor regional de internet fibra óptica**

[![Deploy Status](https://img.shields.io/badge/deploy-live-brightgreen?style=flat-square&logo=vercel)](https://www.seconecte.net)
[![Site](https://img.shields.io/badge/site-seconecte.net-blue?style=flat-square&logo=google-chrome)](https://www.seconecte.net)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

🌐 **[www.seconecte.net](https://www.seconecte.net)**

</div>

---

## 📋 Sobre o Projeto

Landing page completa desenvolvida para a **Conecte Telecom**, provedor regional de internet fibra óptica de Arroio do Sal - RS, com +1.000 clientes ativos e cobertura em 30+ bairros.

O projeto foi construído do zero com foco em:
- **Performance** — arquivo único otimizado, assets em base64, sem dependências externas
- **Conversão** — CTAs estratégicos, seção de planos destacada, botões WhatsApp integrados
- **Identidade local** — branding humanizado, mascote Gasturinha, seção especial para veranistas
- **Funcionalidade** — integração real com API de cobranças para segunda via de fatura

---

## 🚀 Stack & Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript Vanilla |
| Backend | Vercel Serverless Functions (Node.js) |
| Hospedagem | Vercel (deploy automático via GitHub) |
| Domínio | Squarespace DNS → seconecte.net |
| Cobranças | API Asaas v3 |
| E-mail | Resend API |
| Font | Plus Jakarta Sans (Google Fonts) |
| Icons | Font Awesome 6 |

---

## ✨ Funcionalidades

### Site
- [x] Design responsivo — mobile first
- [x] Seção hero com gradiente cinematográfico e mascote animado
- [x] Planos de internet com destaque visual (300mb / 500mb ⭐ / 600mb)
- [x] Contador de estatísticas animado (+1.000 clientes, 5 anos, 30 bairros, 4.9★)
- [x] Seção de cobertura com 30+ bairros mapeados
- [x] Seção especial para veranistas (temporada de verão)
- [x] Depoimentos de clientes com botão "Avaliar no Google"
- [x] Google Maps integrado com localização real
- [x] FAQ interativo com accordion
- [x] Seção de redes sociais (Instagram, Facebook, WhatsApp, Google Maps)
- [x] Favicon com logo oficial
- [x] SEO básico configurado

### Integrações
- [x] WhatsApp Business links (suporte + comercial)
- [x] Google Maps embed com coordenadas reais
- [x] Instagram e Facebook vinculados
- [x] **Segunda Via de Fatura** — integração com Asaas + autenticação OTP por e-mail

### Segurança
- [x] Autenticação OTP (código 6 dígitos via e-mail) na segunda via
- [x] Chaves de API exclusivamente em variáveis de ambiente (Vercel)
- [x] Rate limiting no endpoint de solicitação de código
- [x] OTP de uso único com expiração de 10 minutos
- [x] E-mail mascarado no frontend (nunca exposto)

### Em desenvolvimento 🚧
- [ ] Área do cliente completa (histórico de pagamentos, chamados, dados)
- [ ] Painel administrativo para gestão de conteúdo
- [ ] Integração com sistema de chamados de suporte

---

## 🏗️ Estrutura do Projeto

```
conecte-landing/
│
├── index.html                    # Site completo (single-page)
│
├── api/
│   └── segunda-via/
│       ├── solicitar.js          # Recebe CPF, envia OTP por e-mail
│       ├── verificar.js          # Valida OTP, retorna faturas
│       └── boleto.js             # Retorna linha digitável do boleto
│
├── vercel.json                   # Configuração da Vercel
├── .env.example                  # Variáveis de ambiente (modelo)
├── .gitignore                    # Arquivos ignorados pelo Git
└── README.md                     # Este arquivo
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- Conta na [Vercel](https://vercel.com) (para as serverless functions)
- Conta no [Asaas](https://asaas.com) (sandbox disponível para testes)
- Conta no [Resend](https://resend.com) (plano gratuito)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/devlucasroldao/conecte-landing.git
cd conecte-landing

# 2. Instale a Vercel CLI
npm install -g vercel

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves

# 4. Rode localmente com suporte às serverless functions
vercel dev
```

O site estará disponível em `http://localhost:3000`

---

## 🔐 Variáveis de Ambiente

Configure no painel da Vercel em **Settings → Environment Variables**:

```env
ASAAS_API_KEY=        # Chave da API Asaas (produção ou sandbox)
RESEND_API_KEY=       # Chave da API Resend
OTP_FROM_EMAIL=       # E-mail remetente verificado no Resend
```

> ⚠️ **Nunca** commite o arquivo `.env` com valores reais. Use sempre o `.env.example` como referência.

---

## 🔄 Fluxo da Segunda Via de Fatura

```
Cliente acessa /segunda-via no site
          ↓
     Digita o CPF
          ↓
  POST /api/segunda-via/solicitar
  → Busca cliente no Asaas por CPF
  → Gera OTP de 6 dígitos (expira em 10min)
  → Envia código para o e-mail cadastrado via Resend
  → Retorna e-mail mascarado (ex: jo***@gmail.com)
          ↓
  Cliente digita o código recebido
          ↓
  POST /api/segunda-via/verificar
  → Valida OTP (uso único)
  → Busca faturas PENDING + OVERDUE no Asaas
  → Retorna lista de faturas
          ↓
  Cliente vê faturas em aberto
  → "Ver fatura" → abre invoiceUrl do Asaas
  → "Linha digitável" → POST /api/segunda-via/boleto
                        → retorna identificationField
                        → modal com botão copiar
```

---

## 📱 Deploy

O projeto usa **deploy automático via GitHub + Vercel**:

1. Push na branch `main` → Vercel detecta automaticamente
2. Build e deploy em ~30 segundos
3. Site atualizado em `www.seconecte.net`

```bash
# Para fazer deploy manualmente
vercel --prod
```

---

## 🎨 Design System

| Token | Valor |
|---|---|
| Cor primária | `#0a7ee2` (Azul Conecte) |
| Cor destaque | `#ffde59` (Amarelo) |
| Tipografia | Plus Jakarta Sans |
| Border radius | 12px / 16px / 24px / 999px |
| Sombra padrão | `0 4px 24px rgba(10,126,226,.12)` |

---

## 📊 Performance

- ✅ Assets otimizados — logo SVG definido uma vez via JS, base64 inline
- ✅ Lazy loading em imagens
- ✅ Animações CSS puras (sem bibliotecas JS)
- ✅ Google Fonts com `display=swap`
- ✅ HTTPS automático via Vercel

---

## 👨‍💻 Autor

**Lucas Roldão**

[![GitHub](https://img.shields.io/badge/GitHub-devlucasroldao-181717?style=flat-square&logo=github)](https://github.com/devlucasroldao)

---

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para a **Conecte Telecom**.
Todos os direitos reservados © 2026 Conecte Telecom.

---

<div align="center">
  <sub>Feito com ☕ em Arroio do Sal - RS</sub>
</div>
