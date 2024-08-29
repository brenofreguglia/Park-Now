document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginButton').addEventListener('click', async function () {
        // Captura os valores dos campos
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        // alert(senha)

        // Validação simples
        if (email === '' || senha === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Desabilita o botão de envio para evitar múltiplos envios
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.disabled = true;
        } else {
            console.error('Botão de login não encontrado.');
        }

        const response = await fetch('http://10.111.9.17:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })
        if (!response.ok) {
            throw new Error(`Response status:  ${response.status}`);
        }
        else{
            const json = await response.json();
            // console.log(json);
            window.location.href = './cadastrar.html'; // Exemplo de redirecionamento

        }
    });
});
