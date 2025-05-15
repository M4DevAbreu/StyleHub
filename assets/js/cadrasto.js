document.getElementById("cadastroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const senha = document.getElementById("senha").value;
  const genero = document.querySelector('input[name="genero"]:checked')?.value;

  let mensagem = `
    <strong>Nome:</strong> ${nome} ${sobrenome}<br>
    <strong>CPF:</strong> ${cpf}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Telefone:</strong> ${telefone}<br>
    <strong>Endereço:</strong> ${endereco}<br>
    <strong>Gênero:</strong> ${genero || "Não informado"}<br>
  `;

  document.getElementById("mensagemConteudo").innerHTML = mensagem;
  new bootstrap.Modal(document.getElementById("mensagemModal")).show();
});
