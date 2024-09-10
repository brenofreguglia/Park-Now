const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const crypto = require('crypto');
 
const app = express();
const port = 3000;
 
app.use(cors());
app.use(bodyParser.json()); // Apenas uma vez é suficiente
 
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'parknow',
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0
});
 
// Endpoint para o login
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
 
    console.log('Recebido:', email, senha);
 
    // Validação dos dados recebidos
    if (!email || !senha) {
      return res.status(400).json({ msg: "Email e Senha são obrigatórios" });
    }
 
    const hash = crypto.createHash('SHA256').update(senha).digest('hex');
 
    // Definição da consulta SQL para buscar o ID, email e nome do usuário
    const sql = "SELECT id, email, nome FROM cadastro WHERE email = ? AND senha = ?";
 
    // Tentativa de conexão com o banco de dados
    let connection;
    try {
      connection = await pool.getConnection();
    } catch (dbError) {
      console.error("Erro ao conectar ao banco de dados:", dbError);
      return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
    }
 
    try {
      const [rows] = await connection.execute(sql, [email, hash]);
      connection.release();
 
      if (rows.length === 1) {
        // Se o login for bem-sucedido, retorna o ID, email e nome do usuário
        res.json({
          msg: "Login realizado com sucesso",
          id: rows[0].id,         // Retorna o ID do usuário
          email: rows[0].email,   // Retorna o email do usuário
          nome: rows[0].nome      // Retorna o nome do usuário
        });
      } else {
        res.status(401).json({ msg: "Email ou Senha incorreta" });
      }
    } catch (queryError) {
      console.error("Erro ao executar a query:", queryError);
      res.status(500).json({ error: "Erro interno ao processar login" });
    } finally {
      if (connection) connection.release(); // Garante que a conexão será liberada
    }
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ error: "Erro interno ao processar login" });
  }
});
// Endpoint para o cadastro
app.post('/cadastro', async (req, res) => {
 
 
  // Conexão com o banco de dados
 
  try {
    const { nome, cidade, endereco, cep, vagas, func_horario, latitude, longitude } = req.body;
 
    console.log('clicou:', nome, cidade, endereco, cep, vagas, func_horario, latitude, longitude);
 
    // Validação simples dos campos
    if (!nome || !cidade || !endereco || !cep || !vagas || !func_horario || !latitude || !longitude) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }
 
    const connection = await pool.getConnection();
    let sql = `
          INSERT INTO local (nome, cidade, endereco, cep, vagas, func_horario, latitude, longitude)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
 
    await connection.execute(sql, [nome, cidade, endereco, cep, vagas, func_horario, latitude, longitude]);
    connection.release();
    res.json({ msg: "local cadastrado com sucesso" });
  } catch (dbError) {
    console.error("Erro ao conectar ao banco de dados ou executar a query:", dbError);
    res.status(500).json({ error: "Erro interno ao processar cadastro" });
 
}});
 
 
// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
 