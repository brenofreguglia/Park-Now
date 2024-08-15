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
    const { string } = req.query;

    if (!string) {
        return res.status(400).json({ msg: 'Informe uma string para gerar o hash' });
    }

    const hash = crypto.createHash('SHA256').update(string).digest('hex');
    res.json({ msg: hash });
});

// Função de validação de senha
const validatePassword = (password) => {
    // Verifica se a senha tem no mínimo 8 caracteres e contém pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
};

// Função de validação de campos
const validateFields = (data) => {
    const { nome, sobrenome, cpf, endereco, cep, telefone, email } = data;

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    const cpfRegex = /^\d{11}$/;
    const cepRegex = /^\d{8}$/;
    const phoneRegex = /^\d{10,11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(nome) || !nameRegex.test(sobrenome)) {
        return 'Nome ou Sobrenome inválido. Não deve conter números ou caracteres especiais.';
    }
    if (!cpfRegex.test(cpf)) {
        return 'CPF inválido. Deve conter apenas 11 dígitos numéricos.';
    }
    if (!cepRegex.test(cep)) {
        return 'CEP inválido. Deve conter 8 dígitos numéricos.';
    }
    if (!phoneRegex.test(telefone)) {
        return 'Telefone inválido. Deve conter 10 ou 11 dígitos numéricos.';
    }
    if (!emailRegex.test(email)) {
        return 'Email inválido. Deve ser um email válido com domínio.';
    }

    return null;
};

// Rota para cadastrar o cliente
app.post('/cadastro', async (req, res) => {
    try {
        const { nome, sobrenome, cpf, endereco, cep, telefone, email, senha } = req.body;

        // Verificação de campos vazios
        if (!nome || !sobrenome || !cpf || !endereco || !cep || !telefone || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Validação dos dados
        const validationError = validateFields({ nome, sobrenome, cpf, endereco, cep, telefone, email });
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        // Validação da senha
        if (!validatePassword(senha)) {
            return res.status(400).json({ error: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' });
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
        res.json({ msg: 'Registro gravado com sucesso!' });

    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
        res.status(500).json({ error: 'Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.' });
    }
});

app.post('/login', async (req, res) => {
    try {
      const { email, senha } = req.body;

      console.log(email, senha)
  
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

// Rota para atualizar perfil
app.put('/atualizar', async (req, res) => {
  const { id, nome, telefone, email, senha } = req.body;

  if (!id || !nome || !telefone || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const hash = crypto.createHash('SHA256').update(senha).digest('hex');
    const [result] = await pool.execute('UPDATE cadastro SET nome = ?, telefone = ?, email = ?, senha = ? WHERE id = ?', [nome, telefone, email, hash, id]);

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Erro ao atualizar o perfil' });
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// ROTA PRA CADASTRAR O LOCAL 
/*app.post('/api/parknow/local', async (req, res) => {

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
}); */


// ROTA DO CLIENTE
/*app.get('/api/parknow/cliente', async (req, res) => {

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

}); */

// ROTA PRA DELETAR CONTA DO CLIENTE
/*app.delete('/api/parknow/cadastro/:id', async (req, res) => {
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
}) */

// ROTA PRA EDITAR CONTA DO CLIENTE
/*app.put('/api/parknow/cadastro/', async (req, res) => {
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
}) */

app.listen(porta, () => console.log(`ver rodando em porta ${porta}`))