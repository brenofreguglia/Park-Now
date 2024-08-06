const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const bodyparser = require("body-parser")

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
app.get("api/parknow/consulta", async (req, res) => {
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
        res.status(500).json({ error: "Deu algum erro na busca" });
    }
});


//  ROTA PRA CADASTRAR O CLIENTE
app.post("/api/parknow/cadastro", async (req, res) => {
    try {
        const { nome, sobrenome, cpf, endereco, cep, telefone, email, senha } = req.body
        if (!nome || !sobrenome || !cpf || !endereco || !cep || !telefone || !email || !senha) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
        let conexao = await pool.getConnection()
        const sql = `INSERT INTO cadastro (nome, sobrenome, cpf, endereco, cep, telefone,
        email, senha) VALUES ("${nome}","${sobrenome}","${cpf}","${endereco}","${cep}","${telefone}",
        "${email}","${senha}")`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        
        res.json({ msg: "Registro gravado!" })

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro no cadastro" })
    }
});


//ROTA LOGIN DO CLIENTE
app.post("/api/parknow/login", async (req, res) => {
    try {
        const { id, email, senha } = req.body
        const conexao = await pool.getConnection()
        let sql = `INSERT INTO login (id, email, senha) VALUE ("${id}","${email}","${senha}")`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: "Registro gravado!" })

        if (linhas.length === 1) {
            res.json({msg: "Login realizado com sucesso", login: `${linha[0].login}`});
          } else {
            res.json({msg: "Login ou Senha incorreta"});
          }

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro no cadastro" })
    }

    
});


// ROTA PRA CADASTRAR O LOCAL 
app.post("/api/parknow/local", async (req, res) => {

    try {
        const { id_lugar, nome, cidade, endereco, cep, vagas, func_horarios } = req.body
        const conexao = await pool.getConnection()
        let sql = `INSERT INTO local (id_lugar, nome, cidade, endereco, cep, vagas, func_horarios) VALUE 
        ("${id_lugar}", "${nome}", "${cidade}", "${endereco}", "${cep}", "${vagas}", "${func_horarios}")`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: "Registro gravado!" })
    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro no cadastro" })
    }
});


// ROTA DO CLIENTE
app.get("/api/parknow/cliente", async (req, res) => {

    try {
        const { id_cliente, nome, tipo_veiculo, endereco, cep, placa_automovel, } = req.body
        const conexao = await pool.getConnection()
        let sql = `SELECT *`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: "Registro gravado!" })
    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro no cadastro" })
    }

});

// ROTA PRA DELETAR CONTA DO CLIENTE
app.delete("/api/parknow/cadastro/:id", async (req, res) => {
    try {
        const id_passado = req.params.id
        const conexao = await pool.getConnection()
        const sql = `DELETE FROM usuarios WHERE id = "${id_passado}"`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: "Registro excluído!" })

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro na exclusão" })
    }
})

// ROTA PRA EDITAR CONTA DO CLIENTE
app.put("/api/parknow/cadastro/", async (req, res) => {
    try {
        const { id, nome, email,sobrenome,username,cpf,endereco,cep,telefone,senha } = req.body
        const conexao = await pool.getConnection()
        const sql = `UPDATE usuarios SET nome = "${nome}", sobrenome = "${sobrenome}", username = "${username}", cpf = "${cpf}",
        endereco = "${endereco}", cep = "${cep}", telefone = "${telefone}", email = "${email}", senha = "${senha}" WHERE id = ${id}`
        console.log(sql)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json({ msg: "Registro gravado!" })

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro na edição" })
    }
})

app.listen(porta, () => console.log(`ver rodando em porta ${porta}`))