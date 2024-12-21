// Elementos do HTML
const resultadoDiv = document.getElementById('avisos');
const vidaP1Element = document.getElementById('hpPlayer1');
const vidaP2Element = document.getElementById('hpPlayer2');
const contagemElement = document.getElementById('contagem');
const imagemJogada1 = document.getElementById('imagemDinamica1');
const imagemJogada2 = document.getElementById('imagemDinamica2');
const avisoElement = document.getElementById('avisos');

// Variáveis globais
let vidas = { player1: 10, player2: 10 };
let jogadores = {}; // Armazena as jogadas de cada jogador
let nomes = { player1: '', player2: '' };

let contadorAtivo = false; // Controla se a contador esta ativo
let selecaoAtiva = 0

avisoElement.innerHTML = 'fim da contagem tem 1 segundo para escolher'
// Recupera os nomes do localStorage
document.addEventListener('DOMContentLoaded', function () {
  const jogador1 = localStorage.getItem('jogador1');
  const jogador2 = localStorage.getItem('jogador2');

  nomes.player1 = jogador1 || 'Jogador 1';
  nomes.player2 = jogador2 || 'Jogador 2';

  // Exibe os nomes no HTML
  const nomeJogador1 = document.getElementById('nomejogador1');
  const nomeJogador2 = document.getElementById('nomejogador2');

  if (nomeJogador1) nomeJogador1.innerText = nomes.player1;
  if (nomeJogador2) nomeJogador2.innerText = nomes.player2;
});


// Função para iniciar o contador
function iniciarRodadaContador() {
  contadorAtivo = true;
  let tempoRestante = 3; // Tempo do contador em segundos
  contagemElement.innerText = tempoRestante;

  const intervalo = setInterval(() => {
    tempoRestante--;
    if (tempoRestante > 0) {
      contagemElement.innerText = tempoRestante;
    } else {
      clearInterval(intervalo);
      contagemElement.innerText = 'Vai!';
      contadorAtivo = false; // Contador finalizado
      tempoSelecao()
    }
  }, 1000);
}
// funçao do tempo de seleçao
function tempoSelecao(){
    selecaoAtiva = 1;

    let restanteTempo = 1; // tempo contador de seleçao
    contagemElement.innerText = "selecione"
    const interv = setInterval(()=>{
      restanteTempo--;
      if(restanteTempo > 0){
        contagemElement.innerText = restanteTempo;
      }else{
        clearInterval(interv)
        
         // Avaliação final ao término do tempo de seleção
      if (!jogadores.player1) {
        jogadores.player1 = "Nenhuma"; // Jogador 1 não jogou
      }
      if (!jogadores.player2) {
        jogadores.player2 = "Nenhuma"; // Jogador 2 não jogou
      }
      
      verificarResultado(); // Avalia o resultado considerando jogadas e ausências
      selecaoAtiva = 2; // Desativa seleção
      jogadores = {}; // Reinicia jogadas
      iniciarRodadaContador(); // Prepara próxima rodada
      } 
    },1000)
}

// funçao para iniciar o contador do tempo para jogar

iniciarRodadaContador()
// Função para enviar a jogada do jogador
function enviarJogada(jogada, jogador) {
  if (contadorAtivo && selecaoAtiva !== 1) {
   
    return;
  }
  

  if (jogadores[jogador]) return; // Apenas a primeira jogada será contabilizada

  if (jogador === 1) {
    jogadores.player1 = jogada;
    atualizarImagemJogada(jogada, 1);
  } else if (jogador === 2) {
    jogadores.player2 = jogada;
    atualizarImagemJogada(jogada, 2);
  }


}

// Atualiza a imagem da jogada do jogador
function atualizarImagemJogada(jogada, jogador) {
  const imagem = jogador === 1 ? imagemJogada1 : imagemJogada2;

  if (jogada === 'Pedra') {
    imagem.src = "../DUELO_JKP/IMAGENS_JKP/pedrareal.png";
  } else if (jogada === 'Papel') {
    imagem.src = "../DUELO_JKP/IMAGENS_JKP/papelreal.png";
  } else if (jogada === 'Tesoura') {
    imagem.src = "../DUELO_JKP/IMAGENS_JKP/tesourareal.png";
  }
}

// Função para verificar o resultado da rodada
function verificarResultado() {
  const jogadaP1 = jogadores.player1;
  const jogadaP2 = jogadores.player2;
  let resultado = '';

  // Comparação das jogadas

  if (jogadaP1 === jogadaP2 ) {
    resultado = 'Empate';
    vidas.player1--;
    vidas.player2--;
    
  } else if ((jogadaP1 === 'Pedra' && jogadaP2 === 'Tesoura') ||
  (jogadaP1 === 'Tesoura' && jogadaP2 === 'Papel') ||
  (jogadaP1 === 'Papel' && jogadaP2 === 'Pedra') ||
  (jogadaP2 === "Nenhuma") 
  
) {
    resultado = `${nomes.player1} venceu`;
    vidas.player2 -= 2;
  } else {
    resultado = `${nomes.player2} venceu`;
    vidas.player1 -= 2;
  }

  // Exibir o resultado
  resultadoDiv.innerHTML = `${resultado} <br> Jogada 1: ${jogadaP1} <br> Jogada 2: ${jogadaP2}`;

  // Atualizar as vidas dos jogadores
  vidaP1Element.style.width = `${vidas.player1 * 10}%`;
  vidaP2Element.style.width = `${vidas.player2 * 10}%`;

  // Exibir o valor da vida dentro das barras
  vidaP1Element.textContent = vidas.player1;
  vidaP2Element.textContent = vidas.player2;

  // Se algum jogador perdeu, reiniciar a partida
  if (vidas.player1 <= 0 || vidas.player2 <= 0) {
    avisoElement.innerHTML = 'A partida foi reiniciada! Ambos os jogadores voltaram à vida inicial (10).';
    setTimeout(reiniciarPartida, 3000); // Reinicia após 3 segundos
  }

  // Reiniciar jogadas para a próxima rodada
  jogadores = {};
}

// Função para reiniciar a partida
function reiniciarPartida() {
  vidas = { player1: 10, player2: 10 }; // Reinicia as vidas
  resultadoDiv.innerHTML = ''; // Limpa o resultado
  vidaP1Element.style.width = '100%';
  vidaP2Element.style.width = '100%';
  vidaP1Element.textContent = vidas.player1;
  vidaP2Element.textContent = vidas.player2;
  avisoElement.innerHTML = ''; // Limpa o aviso
}

// Captura os eventos de teclado
document.addEventListener("keydown", function (ev) {
  const key = ev.key.toLowerCase();
  console.log(`Tecla pressionada: ${ev.key}` + jogadores.player1 + jogadores.player2);

  // Iniciar contagem (tecla M)
  if (key === 'm') iniciarRodadaContador();

  // Jogador 1: W, A, D
  if (key === "w") enviarJogada("Pedra", 1);
  else if (key === "a") enviarJogada("Papel", 1);
  else if (key === "d") enviarJogada("Tesoura", 1);

  // Jogador 2: I, J, L
  if (key === "i") enviarJogada("Pedra", 2);
  else if (key === "j") enviarJogada("Papel", 2);
  else if (key === "l") enviarJogada("Tesoura", 2);
});
