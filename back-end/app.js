const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const mysql = require('mysql2/promise')
const bodyparser = require('body-parser')

const app = express()
const porta = 3000
app.use(cors())
app.use(bodyparser.json())

const pool = mysql.createPool({
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `parknow`,
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0
})


// Rota pra consulta
app.get('api/parknow/consulta', async (req, res) => {
    try {
        const conexao = await pool.getConnection();
        const sql = `SELECT c.nome, c.id, c.ibge, i.nome AS nome_cidade, c.cep, i.uf
        FROM clientes c, ibge i
        WHERE i.codigo = c.ibge`;
        const [linha] = await conexao.execute(sql);
        conexao.release();
        res.json(linha);
    } catch (error) {
        console.log(`O erro que ocorreu foi: ${error}`);
        res.status(500).json({ error: 'Deu algum erro na busca' });
    }
});

// Rota para gerar e retornar o hash SHA-256 de uma string
app.get('/hash', (req, res) => {
    // Recebendo a string a ser criptografada
    const { string } = req.query;
  
    // Validação da string
    if (!string) {
      return res.status(400).json({ msg: 'Informe uma string para gerar o hash' });
    }
  
    const hash = crypto.createHash('SHA256').update(string).digest('hex');
    res.json({ msg: hash });
  });


// Rota para cadastrar o cliente
app.post('/cadastro', async (req, res) => {
    try {
        const { nome, sobrenome, cpf, endereco, cep, telefone, email, senha } = req.body;

        // Validação dos dados recebidos
        if (!nome || !sobrenome || !cpf || !endereco || !cep || !telefone || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Criptografa a senha
        const hash = crypto.createHash('SHA256').update(senha).digest('hex');

        // Obtém uma conexão do pool
        const conect = await pool.getConnection();

        // Prepara e executa a consulta SQL com parâmetros
        const sql = `INSERT INTO cadastro (nome, sobrenome, cpf, endereco, cep, telefone, email, senha) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await conect.execute(sql, [nome, sobrenome, cpf, endereco, cep, telefone, email, hash]);

        // Libera a conexão
        conect.release();

        // Retorna uma resposta de sucesso
        res.json({ msg: 'Registro gravado!' });

    } catch (error) {
        console.log(`O Erro que ocorreu foi: ${error}`);
        res.status(500).json({ error: 'Deu algum erro no cadastro' });
    }
});


app.post('/login', async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      // Validação dos dados recebidos
      if (!email || !senha) {
        return res.status(400).json({ msg: "Email e Senha são obrigatórios" });
      }
  
      const hash = crypto.createHash('SHA256').update(senha).digest('hex');
  
      // Definição da consulta SQL
      const sql = "SELECT email FROM cadastro WHERE email = ? AND senha = ?";
      
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(sql, [email, hash]);
      connection.release();
  
      if (rows.length === 1) {
        res.json({ msg: "Login realizado com sucesso", email: rows[0].email });
      } else {
        res.status(401).json({ msg: "Email ou Senha incorreta" });
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      res.status(500).json({ error: "Erro interno ao processar login" });
    }
  });



// ROTA PRA CADASTRAR O LOCAL 
app.post('/api/parknow/local', async (req, res) => {

    try {
        const { id_lugar, nome, cidade, endereco, cep, vagas, func_horarios } = req.body
        const conexao = await pool.getConnection()
        let sql = `INSERT INTO local (id_lugar, nome, cidade, endereco, cep, vagas, func_horarios) VALUE 
        ('${id_lugar}', '${nome}', '${cidade}', '${endereco}', '${cep}', '${vagas}', '${func_horarios}')`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: 'Registro gravado!' })
    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: 'Deu algum erro no cadastro' })
    }
});


// ROTA DO CLIENTE
app.get('/api/parknow/cliente', async (req, res) => {

    try {
        const { id_cliente, nome, tipo_veiculo, endereco, cep, placa_automovel, } = req.body
        const conexao = await pool.getConnection()
        let sql = `SELECT *`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: 'Registro gravado!' })
    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: 'Deu algum erro no cadastro' })
    }

});

// ROTA PRA DELETAR CONTA DO CLIENTE
app.delete('/api/parknow/cadastro/:id', async (req, res) => {
    try {
        const id_passado = req.params.id
        const conexao = await pool.getConnection()
        const sql = `DELETE FROM usuarios WHERE id = '${id_passado}'`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: 'Registro excluído!' })

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: 'Deu algum erro na exclusão' })
    }
})

// ROTA PRA EDITAR CONTA DO CLIENTE
app.put('/api/parknow/cadastro/', async (req, res) => {
    try {
        const { id, nome, email,sobrenome,username,cpf,endereco,cep,telefone,senha } = req.body
        const conexao = await pool.getConnection()
        const sql = `UPDATE usuarios SET nome = '${nome}', sobrenome = '${sobrenome}', username = '${username}', cpf = '${cpf}',
        endereco = '${endereco}', cep = '${cep}', telefone = '${telefone}', email = '${email}', senha = '${senha}' WHERE id = ${id}`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: 'Registro gravado!' })

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: 'Deu algum erro na edição' })
    }
})

app.listen(porta, () => console.log(`ver rodando em porta ${porta}`))