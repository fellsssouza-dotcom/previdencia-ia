const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Rota principal de teste
app.get('/', (req, res) => {
    res.send('🚀 Bot da Previdência funcionando!');
});

// Rota do webhook para verificação (GET) - OBRIGATÓRIA!
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('📩 Verificação recebida:');
    console.log('Mode:', mode);
    console.log('Token:', token);
    console.log('Challenge:', challenge);
    console.log('VERIFY_TOKEN no servidor:', process.env.VERIFY_TOKEN);

    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('✅ Webhook verificado com sucesso!');
        res.status(200).send(challenge);
    } else {
        console.log('❌ Falha na verificação');
        res.sendStatus(403);
    }
});

// Rota do webhook para receber mensagens (POST)
app.post('/webhook', (req, res) => {
    console.log('📩 Mensagem recebida:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
