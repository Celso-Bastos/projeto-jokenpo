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
let bencaos_jogadas = {
  player1: null, // ou o objeto da bênção escolhido
  player2: null
}
let selecaoDeBencaos = false;
let bencaos_rodada = [];
let bencaosSorteadas = [];

let buffAtivos = {
  player1: 0 ,
  player2: 0  
}

let contadorAtivo = false; // Controla se a contador esta ativo
let selecaoAtiva = 0

//irei adicionar as bençaos e as maldiçoes
let bençaos = [
  {
    nome: "Força",
    buff: 1,
    case: 'vitoria'
  },
  {
    nome: "escudo abençoado",
    buff: 1,
    case: "Vitoria oponente"

  },
  {
    nome: "sorte",
    buff: 1,
    case: "empate"

  },
  {
    nome: "sacrificio",
    buff: 3,
    debuff: 1,
    case: 'vitoria',
  },
  {
    nome: "escudo amaldçoado",
    buff: 3,
    debuff: 1, // corrigido de "debuf"
    case: "Vitoria oponente"

  },
  {
    nome: "jackpot",
    buff: 4,
    debuff: 2,
    case: "empate(caso contrario debuff)",

  }

]

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

function mostrarSeleçaobençao(jogador){
  const div = document.getElementById("selecaoBencao");
  const titulo = document.getElementById('tituloBencao');
  const opcoes = document.getElementById('opcoesBencao');

  div.style.display="block";
  titulo.innerHTML = `${nomes[`player${jogador}`]}, escolha sua bênção:`;
  opcoes.innerHTML = '';

  bencaos_rodada.forEach((bencao, index) => {
    const btn = document.createElement('button');
    btn.innerText = bencao.nome;
    btn.onclick = () => escolhaBencao(jogador, index);
    opcoes.appendChild(btn);
  });
}


function enviarJogadaBencao(jogada, jogador){
  
}
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

let rodadaEmAndamento = false

// Função para verificar o resultado da rodada
function verificarResultado() {
  const jogadaP1 = jogadores.player1;
  const jogadaP2 = jogadores.player2;
  let resultado = '';

  // Sortear bênçãos automaticamente para a rodada
  bencaos_jogadas.player1 = sortearBencaoAleatoria();
  bencaos_jogadas.player2 = sortearBencaoAleatoria();

  let danoP1 = 0;
  let danoP2 = 0;

  // Comparação das jogadas
  if (jogadaP1 === jogadaP2) {
    resultado = 'Empate';
    danoP1 = 1;
    danoP2 = 1;
  } else if (
    (jogadaP1 === 'Pedra' && jogadaP2 === 'Tesoura') ||
    (jogadaP1 === 'Tesoura' && jogadaP2 === 'Papel') ||
    (jogadaP1 === 'Papel' && jogadaP2 === 'Pedra') ||
    (jogadaP2 === "Nenhuma")
  ) {
    resultado = `${nomes.player1} venceu`;
    danoP2 = 2;
  } else {
    resultado = `${nomes.player2} venceu`;
    danoP1 = 2;
  }

  // Aplicar bênção do player 1
  const b1 = bencaos_jogadas.player1;
  if (b1) {
    if (
      (b1.case === 'vitoria' && resultado.includes(nomes.player1)) ||
      (b1.case === 'Vitoria oponente' && resultado.includes(nomes.player2)) ||
      (b1.case === 'empate' && resultado === 'Empate') ||
      (b1.case === 'empate(caso contrario debuff)')
    ) {
      if (b1.case === 'empate(caso contrario debuff)') {
        if (resultado === 'Empate') {
          danoP2 += b1.buff || 0;
        } else {
          danoP1 += b1.debuff || 0;
        }
      } else {
        danoP2 += b1.buff || 0;
        danoP1 -= b1.debuff || 0;
      }
    }
  }

  // Aplicar bênção do player 2
  const b2 = bencaos_jogadas.player2;
  if (b2) {
    if (
      (b2.case === 'vitoria' && resultado.includes(nomes.player2)) ||
      (b2.case === 'Vitoria oponente' && resultado.includes(nomes.player1)) ||
      (b2.case === 'empate' && resultado === 'Empate') ||
      (b2.case === 'empate(caso contrario debuff)')
    ) {
      if (b2.case === 'empate(caso contrario debuff)') {
        if (resultado === 'Empate') {
          danoP1 += b2.buff || 0;
        } else {
          danoP2 += b2.debuff || 0;
        }
      } else {
        danoP1 += b2.buff || 0;
        danoP2 -= b2.debuff || 0;
      }
    }
  }

  // Aplicar danos às vidas
  vidas.player1 -= danoP1;
  vidas.player2 -= danoP2;
  vidas.player1 = Math.max(0, vidas.player1);
  vidas.player2 = Math.max(0, vidas.player2);

  // Exibir resultado e bênçãos
  resultadoDiv.innerHTML = `
    ${resultado} <br>
    Jogada 1: ${jogadaP1} (${b1?.nome || 'Sem bênção'})<br>
    Jogada 2: ${jogadaP2} (${b2?.nome || 'Sem bênção'})
  `;

  // Atualizar barra de vida
  vidaP1Element.style.width = `${vidas.player1 * 10}%`;
  vidaP2Element.style.width = `${vidas.player2 * 10}%`;
  vidaP1Element.textContent = vidas.player1;
  vidaP2Element.textContent = vidas.player2;

  // Verificar fim da partida
  if (vidas.player1 <= 0 || vidas.player2 <= 0) {
    avisoElement.innerHTML = 'A partida foi reiniciada! Ambos os jogadores voltaram à vida inicial (10).';
    setTimeout(reiniciarPartida, 3000);
  }

  // Limpar jogadas para próxima rodada
  jogadores = {};
}

// aplicar bençaos

function registrarRodada(jogador, escolha){
  jogadores[jogador] = escolha;
  if(jogadores.player1 && jogadores.player2 && !rodadaEmAndamento){
    verificarResultado()
  }

}

function aplicarBencao(jogador, resultado, danoAlvo,danoProprio) {
  const bencao = bencaos_jogadas[jogador];
  const nomeJogador = nomes[jogador];
  const nomeOponente = jogador === 'player1' ? nomes.player2 : nomes.player1;

  if(!bencao) return {danoAlvo,danoProprio};

  const venceu = resultado.includes(nomeJogador)
  const perdeu = resultado.includes(nomeOponente)
  const empate = resultado  === "Empate"

  if (
    (bencao.case === 'vitoria' && venceu) ||
    (bencao.case === 'Vitoria oponente' && perdeu) ||
    (bencao.case === 'empate' && empate) ||
    (bencao.case === 'empate(caso contrario debuff)')
  ) {
    if (bencao.case === 'empate(caso contrario debuff)') {
      if (empate) {
        danoAlvo += bencao.buff || 0;
      } else {
        danoProprio += bencao.debuff || 0;
      }
    } else {
      danoAlvo += bencao.buff || 0;
      danoProprio -= bencao.debuff || 0;
    }
  }

  return { danoAlvo, danoProprio };
  
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

function sortearBencaoAleatoria(){
  const index = Math.floor(Math.random() * bençaos.length)
  return bençaos[index]
}

function aplicarEfeitosBencao(){
  const b1 = bencaos_jogadas.player1
  const b2 = bencaos_jogadas.player2

  //p1
  if(b1.buff) vidas.player1 += b1.buff
  if(b1.debuff) vidas.player1 += b1.debuff

  //p2

  if(b2.buff) vidas.player2 += b2.buff
  if(b2.debuff) vidas.player2 += b2.debuff

    // Atualizar vidas na tela
    vidaP1Element.style.width = `${vidas.player1 * 10}%`;
    vidaP2Element.style.width = `${vidas.player2 * 10}%`;
    vidaP1Element.textContent = vidas.player1;
    vidaP2Element.textContent = vidas.player2;

    selecaoDeBencaos = false; // resetar após aplicar
    // Resetar para próxima rodada
    bencaos_jogadas = {};
    iniciarRodadaContador();
}

function iniciarSelecaoBencaos() {
  selecaoDeBencaos = true;
  bencaos_jogadas = {};

  avisoElement.innerHTML += "<br>Escolham suas bênçãos! (1/2/3 para P1 — 7/8/9 para P2)";
}

/*function escolhaBencao(jogador, indiceEscolhido) {
  // Verifica se o jogador já escolheu
  if (bencaos_jogadas[`player${jogador}`]) return;

   // Pega a bênção sorteada naquele índice
   const bencao = bencaosSorteadas[indiceEscolhido];
   bencaos_jogadas[`player${jogador}`] = bencao;
 
   // Feedback visual
   avisoElement.innerHTML += `<br>${nomes[`player${jogador}`]} escolheu: ${bencao.nome}`;
 
   // Quando os dois escolherem, aplicar efeitos
   if (bencaos_jogadas.player1 && bencaos_jogadas.player2) {
     aplicarEfeitosBencao();
   }
  }*/

/*function calcularDano(resultado,jogador){
  let danoPlayer1 = 0
  let danoPlayer2 = 0

  const habilidade1 = habilidadesJogador1
  const habilidade2 = habilidadesJogador2

  if(resultado === "player1"){
    danoPlayer2 = 1
    //buffs v
    if(habilidade1 === "Força") danoPlayer2 += 1
    if (habilidade1 === "Escudo abençoado") danoPlayer2 -= 1

    //maldicoes

    if(habilidade1 === 'sacrificio'){
      danoPlayer2 += 3
      danoPlayer1 +=1

    }

    if(habilidade2 === "Escudo amaldiçoado"){
      danoPlayer2 += 3
      danoPlayer1 -= 1
    }

    if (resultado === 'player2') {
      danoPlayer1 = 1;
      // Buffs de vitória
      if (habilidade2 === 'Força') danoPlayer1 += 1;
      if (habilidade1 === 'Escudo abençoado') danoPlayer1 -= 1;
  
      // Maldições
      if (habilidade2 === 'Sacrifício') {
        danoPlayer1 += 3;
        danoPlayer2 += 1;
      }
      if (habilidade1 === 'Escudo amaldiçoado') {
        danoPlayer1 += 3;
        danoPlayer2 += 1;
      }
    }

    if (resultado === 'empate') {
      // Buffs de empate
      if (habilidade1 === 'Sorte') danoPlayer2 += 1;
      if (habilidade2 === 'Sorte') danoPlayer1 += 1;
  
      // Maldições de empate
      if (habilidade1 === 'Jackpot') {
        danoPlayer2 += 4;
      } else if (habilidade1 === 'Jackpot') {
        danoPlayer1 += 2;
      }
  
      if (habilidade2 === 'Jackpot') {
        danoPlayer1 += 4;
      } else if (habilidade2 === 'Jackpot') {
        danoPlayer2 += 2;
      }
      
        // Garantir que não tenha dano negativo
  danoPlayer1 = Math.max(0, danoPlayer1);
  danoPlayer2 = Math.max(0, danoPlayer2);

  // Aplicar dano
  vidas.player1 -= danoPlayer1;
  vidas.player2 -= danoPlayer2;

  atualizarVidas();
    }
  }
  

 }*/

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

  if (selecaoDeBencaos) {
    if (key === "1") escolhaBencao(1, 0); // player 1 escolhe 1ª bênção
    if (key === "2") escolhaBencao(1, 1);
    if (key === "3") escolhaBencao(1, 2);
  
    if (key === "7") escolhaBencao(2, 0); // player 2 escolhe 1ª bênção
    if (key === "8") escolhaBencao(2, 1);
    if (key === "9") escolhaBencao(2, 2);
  }
});


