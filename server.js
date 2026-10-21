const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let activeStream = null;

app.get('/', (req, res) => {
  res.send('Servidor do Micro-SaaS de Streaming está online e ativo!');
});

// Rota para iniciar a live
app.post('/api/start-stream', (req, res) => {
  const { twitchKey, kickKey, rtmpSource } = req.body;
  
  if (!twitchKey || !kickKey) {
    return res.status(400).json({ 
      status: 'erro', 
      message: 'Você precisa preencher as chaves de transmissão da Twitch e da Kick.' 
    });
  }

  if (activeStream) {
    return res.status(400).json({ 
      status: 'erro', 
      message: 'Já existe uma transmissão ativa no momento.' 
    });
  }

  console.log('Iniciando tentativa de stream...');
  console.log('Twitch Key recebida:', twitchKey ? 'Configurada (oculta)' : 'Ausente');
  console.log('Kick Key recebida:', kickKey ? 'Configurada (oculta)' : 'Ausente');

  // Simulando o processo de start (quando integrarmos o FFmpeg com o servidor definitivo)
  activeStream = {
    startedAt: new Date(),
    twitchKey,
    kickKey
  };

  res.json({
    status: 'sucesso',
    message: 'Comando recebido! Servidor pronto para retransmitir para Twitch e Kick.',
    plataformas: ['Twitch', 'Kick']
  });
});

// Rota para encerrar a live
app.post('/api/stop-stream', (req, res) => {
  if (!activeStream) {
    return res.status(400).json({ status: 'erro', message: 'Nenhuma live ativa.' });
  }

  activeStream = null;
  console.log('Transmissão encerrada.');
  
  res.json({
    status: 'sucesso',
    message: 'Transmissão encerrada com sucesso.'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
