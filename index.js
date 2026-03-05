const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Rota principal de teste
app.get('/', (req, res) => {
    res.send('Bot da previdenciaria funcionando!');
});

// Rota do webhook para verificação (GET)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('📩 Requisição recebida no webhook GET');
    console.log('Mode:', mode);
    console.log('Token:', token);
    console.log('Challenge:', challenge);
    console.log('VERIFY_TOKEN no servidor:', process.env.VERIFY_TOKEN);

    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('✅ Webhook verificado com sucesso!');
        res.status(200).send(challenge);
    } else {
        console.log('❌ Falha na verificação do webhook');
        res.sendStatus(403);
    }
});

// Rota do webhook para receber mensagens (POST)
app.post('/webhook', (req, res) => {
    console.log('📩 Mensagem recebida:', req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
