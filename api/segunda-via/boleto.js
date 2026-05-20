export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { paymentId } = req.body;
  if (!paymentId) return res.status(400).json({ error: 'paymentId_obrigatorio' });

  try {
    const r = await fetch(
      `https://api.asaas.com/v3/payments/${paymentId}/identificationField`,
      { headers: { 'access_token': process.env.ASAAS_API_KEY } }
    );
    const data = await r.json();
    return res.status(200).json({
      identificationField: data.identificationField,
      barCode: data.barCode
    });
  } catch (err) {
    console.error('Erro boleto:', err);
    return res.status(500).json({ error: 'erro_interno' });
  }
}
