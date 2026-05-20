const otpStore = new Map();

function gerarOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function mascararEmail(email) {
  const [local, domain] = email.split('@');
  const visivel = local.slice(0, 2);
  return `${visivel}${'*'.repeat(Math.max(3, local.length - 2))}@${domain}`;
}

function limparExpirados() {
  const agora = Date.now();
  for (const [key, val] of otpStore.entries()) {
    if (val.expiresAt < agora) otpStore.delete(key);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { cpf } = req.body;
  const cpfLimpo = (cpf || '').replace(/\D/g, '');

  if (cpfLimpo.length !== 11) {
    return res.status(400).json({ error: 'cpf_invalido' });
  }

  // Rate limiting: bloquear se já tem OTP recente (< 60s)
  const existente = otpStore.get(cpfLimpo);
  if (existente && existente.expiresAt - 540000 > Date.now()) {
    return res.status(429).json({ error: 'aguarde_antes_de_reenviar' });
  }

  limparExpirados();

  const ASAAS_KEY = process.env.ASAAS_API_KEY;
  const BASE = 'https://api.asaas.com/v3';
  const headers = {
    'access_token': ASAAS_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const clienteRes = await fetch(
      `${BASE}/customers?cpfCnpj=${cpfLimpo}`,
      { headers }
    );
    const clienteData = await clienteRes.json();

    if (!clienteData.data || clienteData.data.length === 0) {
      return res.status(404).json({ error: 'cadastro_nao_encontrado' });
    }

    const cliente = clienteData.data[0];

    if (!cliente.email) {
      return res.status(422).json({ error: 'sem_email_cadastrado' });
    }

    const code = gerarOTP();
    otpStore.set(cpfLimpo, {
      code,
      email: cliente.email,
      customerId: cliente.id,
      nomeCliente: cliente.name,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.OTP_FROM_EMAIL,
        to: cliente.email,
        subject: 'Seu código de acesso — Conecte Telecom',
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f8fafc;border-radius:16px">
            <div style="text-align:center;margin-bottom:24px">
              <div style="font-size:22px;font-weight:800;color:#0a7ee2">Conecte Telecom</div>
              <div style="font-size:13px;color:#64748b">Arroio do Sal · RS</div>
            </div>
            <div style="background:white;border-radius:12px;padding:28px;border:1px solid #e2e8f0">
              <p style="margin:0 0 16px;font-size:15px;color:#1e293b">
                Olá, <strong>${cliente.name.split(' ')[0]}</strong>!
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.6">
                Seu código para acessar a segunda via da fatura é:
              </p>
              <div style="text-align:center;margin:24px 0">
                <div style="display:inline-block;background:#0a7ee2;color:white;font-size:36px;
                            font-weight:800;letter-spacing:10px;padding:16px 32px;
                            border-radius:12px;font-family:monospace">
                  ${code}
                </div>
              </div>
              <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;text-align:center">
                Este código expira em 10 minutos e é válido para uso único.<br>
                Se não foi você, ignore este e-mail.
              </p>
            </div>
            <p style="text-align:center;font-size:11px;color:#94a3b8;margin-top:20px">
              Conecte Telecom · Rua Paulista, 183 · Arroio do Sal · RS
            </p>
          </div>
        `
      })
    });

    if (!resendRes.ok) {
      console.error('Resend error:', await resendRes.text());
      return res.status(500).json({ error: 'erro_envio_email' });
    }

    return res.status(200).json({
      success: true,
      emailMascarado: mascararEmail(cliente.email)
    });

  } catch (err) {
    console.error('Erro solicitar:', err);
    return res.status(500).json({ error: 'erro_interno' });
  }
}
