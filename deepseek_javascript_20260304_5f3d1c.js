const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

app.use(bodyParser.json());

// Rota de verificação do webhook (GET)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('✅ Webhook verificado!');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Rota para receber mensagens (POST)
app.post('/webhook', async (req, res) => {
    // Responder imediatamente para o WhatsApp (obrigatório)
    res.sendStatus(200);
    
    try {
        const body = req.body;
        console.log('📩 Mensagem recebida:', JSON.stringify(body, null, 2));
        
        // Aqui você vai processar a mensagem depois
        // Por enquanto, só logamos
        
    } catch (error) {
        console.error('Erro:', error);
    }
});

// Rota de teste para ver se o servidor está online
app.get('/', (req, res) => {
    res.send('🚀 Bot da Previdência está online!');
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});