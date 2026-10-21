const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor do Micro-SaaS de Streaming está online e ativo!');
});

// Nova rota que aceita os dados direto na URL (Exemplo: /api/test-stream?twitch=suachave&kick=suachave)
app.get('/api/test-stream', (req, res) => {
  const twitchKey = req.query.twitch;
  const kickKey = req.query.kick;
  
  if (!twitchKey || !kickKey) {
    return res.status(400).json({ 
      status: 'erro', 
      message: 'Faltou colocar as chaves! Use o formato: ?twitch=sua_twitch&kick=sua_kick no final do link.' 
    });
  }

  res.json({
    status: 'sucesso',
    message: 'Chaves recebidas com sucesso via navegador!',
    twitch: twitchKey,
    kick: kickKey,
    plataformas: ['Twitch', 'Kick']
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
