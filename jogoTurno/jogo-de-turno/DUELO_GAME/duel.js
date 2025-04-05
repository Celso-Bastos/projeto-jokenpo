
document.addEventListener('DOMContentLoaded', function () {
  // Inicia o processo de digitação do primeiro texto
  escreverTexto(document.getElementsByClassName('textoDigitado')[0]);

  // Obtém todos os elementos com a classe 'efeitoAparecimento'
  const meusForms = document.querySelectorAll('.efeitoAparecimento');

  // Aguarde 5000 milissegundos (5 segundos) antes de aplicar o efeito de aparecimento
  setTimeout(function () {
    // Itera sobre cada elemento e remove a classe 'escondido'
    meusForms.forEach(function (meuForm) {
      meuForm.classList.remove('escondido');
      meuForm.classList.add('aparecendo');
    });
  }, 5000);
});

// Função para digitar o texto
function escreverTexto(elemento) {
  const textoAlvo = "Olá, não faço ideia de como encontrou este lugar, mas se está aqui sabe o motivo.";
  let index = 0;

  function digitar() {
    elemento.textContent = textoAlvo.slice(0, index);
    index++;

    if (index <= textoAlvo.length) {
      setTimeout(digitar, 50); // Ajuste o intervalo conforme necessário
    } else {
      // Após digitar todo o texto, inicia o processo de digitação do segundo texto
      escreverSegundoTexto(document.getElementsByClassName('textoDigitadoAbaixo')[0]);
    }
  }

  // Inicia o processo de digitação do primeiro texto
  digitar();
}

// Função para digitar o segundo texto
function escreverSegundoTexto(elemento) {
  const textoAlvo = "Insira o nome dos jogadores.";
  let index = 0;

  function digitar() {
    elemento.textContent = textoAlvo.slice(0, index);
    index++;

    if (index <= textoAlvo.length) {
      setTimeout(digitar, 50); // Ajuste o intervalo conforme necessário
    }
  }

  // Inicia o processo de digitação do segundo texto
  digitar();
}

// Função para salvar o nome dos jogadores e mudar de pagina
function nomeJogadores(ev) {
  ev.preventDefault(); // Previne o comportamento padrão do botão (submeter o formulário)

  // Pega os nomes dos jogadores
  const jogador1 = document.getElementById('jogador01').value;
  const jogador2 = document.getElementById('jogador02').value;
  
  localStorage.setItem('jogador1',jogador1 )
  localStorage.setItem('jogador2',jogador2 )


  // Mostra a nova página e esconde a página atual
  window.location.href = "../DUELO_JKP/JKP.html";
  
}
// removido funcao devoltar para a tela inicial

// Adiciona o event listener ao botão após garantir que o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', function () {
  const botaoPronto = document.getElementById("botaop");
  if (botaoPronto) {
    botaoPronto.addEventListener("click", nomeJogadores);
  } else {
    console.error("Elemento com ID 'botaop' não encontrado.");
  }
});