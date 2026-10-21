const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor do Micro-SaaS de Streaming está online e ativo!');
});

app.post('/api/start-stream', (req, res) => {
  const { twitchKey, kickKey } = req.body;
  
  if (!twitchKey || !kickKey) {
    return res.status(400).json({ status: 'erro', message: 'Preencha as chaves da Twitch e da Kick.' });
  }

  // Aqui o servidor processará o recebimento do sinal
  res.json({
    status: 'sucesso',
    message: 'Sinal recebido com sucesso! Retransmitindo para Twitch e Kick.',
    plataformas: ['Twitch', 'Kick']
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
