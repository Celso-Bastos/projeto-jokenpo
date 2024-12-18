
const socket = io();

// Elementos do HTML
const resultadoDiv = document.getElementById('avisos');
const vidaP1Element = document.getElementById('hpPlayer1');
const vidaP2Element = document.getElementById('hpPlayer2');
const contagemElement = document.getElementById('contagem');
const imagemJogada1 = document.getElementById('imagemDinamica1');
const imagemJogada2 = document.getElementById('imagemDinamica2');
const avisoElement = document.getElementById('avisos');

document.addEventListener('DOMContentLoaded', function () {
  // Recupera os nomes do localStorage
  const jogador1 = localStorage.getItem('jogador1') ;
  const jogador2 = localStorage.getItem('jogador2') ;
  
  

  // Certifique-se de que os elementos existem antes de manipulá-los
  const nomeJogador1 = document.getElementById('nomejogador1');
  const nomeJogador2 = document.getElementById('nomejogador2');


  if (nomeJogador1) {
    nomeJogador1.innerText = jogador1; // Ou .textContent, dependendo do elemento
  } else {
    console.error("Elemento 'nomeJogador1' não encontrado.");
  }

  if (nomeJogador2) {
    nomeJogador2.innerText = jogador2;
  } else {
    console.error("Elemento 'nomeJogador2' não encontrado.");
  }
  // Envia os nomes para o servidor ao conectar
  const socket = io();
  socket.emit('nomesJogadores', { jogador1, jogador2 });
});

// Função para enviar a jogada do jogador
function enviarJogada(jogada, jogador) {
  socket.emit('jogada', { jogada: jogada });

  if(jogador ===1){
      // Atualizar a imagem da jogada do jogador
      if (jogada === 'Pedra') {
        console.log("teste")
        imagemJogada1.src = "../DUELO_JKP/IMAGENS_JKP/pedrareal.png";
      } else if (jogada === 'Papel') {
        imagemJogada1.src = "../DUELO_JKP/IMAGENS_JKP/papelreal.png";
      } else if (jogada === 'Tesoura') {
        imagemJogada1.src = "../DUELO_JKP/IMAGENS_JKP/tesourareal.png";
      }
  } 
  if(jogador === 2){
    // Atualizar a imagem da jogada do jogador
    if (jogada === 'Pedra') {
      imagemJogada2.src = "../DUELO_JKP/IMAGENS_JKP/pedrareal.png";
    } else if (jogada === 'Papel') {
      imagemJogada2.src = "../DUELO_JKP/IMAGENS_JKP/papelreal.png";
    } else if (jogada === 'Tesoura') {
      imagemJogada2.src = "../DUELO_JKP/IMAGENS_JKP/tesourareal.png";
    }
} 

}
// Captura os eventos de teclado
document.addEventListener("keydown", function (ev) {
  const key = ev.key.toLocaleLowerCase();
  console.log(`Tecla pressionada: ${ev.key}`);

  // Jogador 1: W, A, D
  if (key === "w") {
    console.log("teste")
    enviarJogada("Pedra", 1);
  } else if (key === "a") {
    enviarJogada("Papel", 1);
  } else if (key === "d") {
    enviarJogada("Tesoura", 1);
  }

  // Jogador 2: I, J, L
  if (key === "i") {
    enviarJogada("Pedra", 2);
  } else if (key === "j") {
    enviarJogada("Papel", 2);
  } else if (key === "l") {
    enviarJogada("Tesoura", 2);
  }
});
socket.on('',(data)=>{

})

// Função para exibir os resultados
socket.on('resultado', (data) => {
  console.log(data)
  // Exibir o resultado da rodada
  resultadoDiv.innerHTML = `${data.resultado} <br> Jogada 1: ${data.jogadaP1} <br> Jogada 2: ${data.jogadaP2}`;
 
  // Atualizar as vidas dos jogadores
  vidaP1Element.style.width = `${data.vidaP1 * 10}%`;
  vidaP2Element.style.width = `${data.vidaP2 * 10}%`;

     // Exibir o valor da vida dentro das barras
     vidaP1Element.textContent = data.vidaP1; // Adiciona o valor da vida do player 1
     vidaP2Element.textContent = data.vidaP2; // Adiciona o valor da vida do player 2

  // Atualizar as imagens das jogadas
  if (data.jogadaP1 === 'Pedra') {
    imagemJogada1.src = "../DUELO_JKP/IMAGENS_JKP/pedra.png";
  } else if (data.jogadaP1 === 'Papel') {
    imagemJogada1.src = "../DUELO_JKP/IMAGENS_JKP/papel.png";
  } else if (data.jogadaP1 === 'Tesoura') {
    imagemJogada1.src = "../DUELO_JKP/IMAGENS_JKP/tesoura.png";
  }

  if (data.jogadaP2 === 'Pedra') {
    imagemJogada2.src = "../DUELO_JKP/IMAGENS_JKP/pedra.png";
  } else if (data.jogadaP2 === 'Papel') {
    imagemJogada2.src = "../DUELO_JKP/IMAGENS_JKP/papel.png";
  } else if (data.jogadaP2 === 'Tesoura') {
    imagemJogada2.src = "../DUELO_JKP/IMAGENS_JKP/tesoura.png";
  }

  // Se algum jogador perdeu, reiniciar a partida
  if (data.vidaP1 <= 0 || data.vidaP2 <= 0) {
    avisoElement.innerHTML = 'A partida foi reiniciada! Ambos os jogadores voltaram à vida inicial (10).';
  }
});

// Função para exibir a contagem regressiva
socket.on('contagem', (data) => {
  contagemElement.textContent = `Contagem: ${data.contagem}`;
});

// Função para exibir mensagens do servidor (avisos)
socket.on('avisos', (data) => {
  avisoElement.innerHTML = data.mensagem;
});
