document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o botão de login existe antes de adicionar o event listener
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', async function () {
            // Captura os valores dos campos
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();

            // Validação simples
            if (email === '' || senha === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Desabilita o botão de envio para evitar múltiplos envios
            loginButton.disabled = true;

            try {
                const response = await fetch('http://10.111.9.39:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
                });

                if (!response.ok) {
                    throw new Error(`Response status:  ${response.status}`);
                }

                const json = await response.json();
                window.location.href = './cadastrar.html'; // Exemplo de redirecionamento
            } catch (error) {
                alert('Erro ao fazer login: ' + error.message);
                loginButton.disabled = false; // Reativa o botão em caso de erro
            }
        });
    } else {
        console.error('Botão de login não encontrado.');
    }

    // Verifica se o formulário de cadastro existe antes de adicionar o event listener
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', async function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const form = event.target;
            const data = new FormData(form);
            const jsonData = {};
            data.forEach((value, key) => (jsonData[key] = value));

            try {
                const response = await fetch('http://10.111.9.39:3000/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });

                if (!response.ok) {
                    throw new Error('Erro ao cadastrar local');
                }

                const result = await response.json();
                alert(result.msg);

                // Limpa o formulário e recarrega a página após o sucesso no cadastro
                form.reset(); // Limpa os campos do formulário
                location.reload(); // Recarrega a página
            } catch (error) {
                alert('Erro ao cadastrar: ' + error.message);
            }
        });
    } else {
        console.error('Formulário de cadastro não encontrado.');
    }
});
