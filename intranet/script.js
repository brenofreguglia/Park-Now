document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Captura os valores dos campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validação simples (pode ser expandida conforme necessário)
    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Envia os dados para o servidor
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login bem-sucedido!');
            // Redirecionar ou realizar outra ação após o login bem-sucedido
            window.location.href = '/dashboard'; // Exemplo de redirecionamento
        } else {
            alert('Usuário ou senha inválidos.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro. Tente novamente mais tarde.');
    });
});