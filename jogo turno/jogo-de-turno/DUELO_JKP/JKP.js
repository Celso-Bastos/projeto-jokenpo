
  document.addEventListener('DOMContentLoaded', function() {
    function voltarPaginaIniciala() {
      window.location.replace('../index.html');
    }
  
    let botaov = document.getElementById('voltar');
    if (botaov) {
      botaov.addEventListener('click', voltarPaginaIniciala);
    } else {
      console.error("Elemento com ID 'voltar' não encontrado.");
    }
  });
  // Função para voltar à página inicial (opcional)
  // puxar nome do jogador
  
  let jogador1Nome = localStorage.getItem('jogador1')
  console.log(jogador1Nome)
  let jogador2Nome = localStorage.getItem('jogador2')
  console.log(jogador2Nome)

  let nomeJogador1 = document.getElementById("nomejogador1")
  nomeJogador1.innerText = jogador1Nome

  let nomeJogador2 = document.getElementById("nomejogador2")
  nomeJogador2.innerText = jogador2Nome
  //mapeando as teclas do teclado
    


  // adicionando as imagens ao js
  let imagemDinamica1 = document.getElementById('iamgemDinamica1')
  let imagemDinamica2 = document.getElementById('iamgemDinamica2')