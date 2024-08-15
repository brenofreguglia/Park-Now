const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Servir arquivos estáticos (por exemplo, HTML e CSS)
app.use(express.static('public'));

// Endpoint para o login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulação de validação de usuário (deve ser substituído por validação real)
    if (username === 'user' && password === 'pass') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
