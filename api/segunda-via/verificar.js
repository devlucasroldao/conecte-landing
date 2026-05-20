const otpStore = new Map();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { cpf, codigo } = req.body;
  const cpfLimpo = (cpf || '').replace(/\D/g, '');

  if (!cpfLimpo || !codigo) {
    return res.status(400).json({ error: 'dados_incompletos' });
  }

  const registro = otpStore.get(cpfLimpo);

  if (!registro) {
    return res.status(401).json({ error: 'codigo_invalido_ou_expirado' });
  }

  if (Date.now() > registro.expiresAt) {
    otpStore.delete(cpfLimpo);
    return res.status(401).json({ error: 'codigo_expirado' });
  }

  if (registro.code !== codigo.trim()) {
    return res.status(401).json({ error: 'codigo_incorreto' });
  }

  const { customerId, nomeCliente } = registro;
  otpStore.delete(cpfLimpo);

  const headers = {
    'access_token': process.env.ASAAS_API_KEY,
    'Content-Type': 'application/json'
  };
  const BASE = 'https://api.asaas.com/v3';

  try {
    const [pendingRes, overdueRes] = await Promise.all([
      fetch(`${BASE}/payments?customer=${customerId}&status=PENDING&limit=20`, { headers }),
      fetch(`${BASE}/payments?customer=${customerId}&status=OVERDUE&limit=20`, { headers })
    ]);

    const [pendingData, overdueData] = await Promise.all([
      pendingRes.json(),
      overdueRes.json()
    ]);

    const faturas = [
      ...(pendingData.data || []),
      ...(overdueData.data || [])
    ]
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .map(f => ({
      id: f.id,
      value: f.value,
      dueDate: f.dueDate,
      status: f.status,
      billingType: f.billingType,
      invoiceUrl: f.invoiceUrl,
      bankSlipUrl: f.bankSlipUrl
    }));

    return res.status(200).json({ nomeCliente, faturas });

  } catch (err) {
    console.error('Erro verificar:', err);
    return res.status(500).json({ error: 'erro_interno' });
  }
}
