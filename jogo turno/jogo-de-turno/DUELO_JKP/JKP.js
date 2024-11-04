
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
  //vida vLOR NO JS
  let vidaP1 = 10
  let vidaP2 = 10
  // vida jogadores
  let vidaElemento1 = document.getElementById('hpPlayer1'); // Adicionei a definição de vidaElemento1
  let vidaElemento2 = document.getElementById('hpPlayer2');
     
  let vidaJogador1 = document.createElement('h4');
  vidaJogador1.innerText = vidaP1;
  
  
  let vidaJogador2 = document.createElement('h4');
  vidaJogador2.innerText = vidaP2;
  
  vidaElemento1.appendChild(vidaJogador1);
  vidaElemento2.appendChild(vidaJogador2);
  
  


  //mapeando as teclas do teclado
  document.addEventListener('DOMContentLoaded', function() {
     // adicionando as imagens ao js
    const imagemDinamica1 = document.getElementById('imagemDinamica1'); // Certifique-se de que o ID está correto
    const imagemDinamica2 = document.getElementById('imagemDinamica2');
        let jogadaP1 = null;
        let jogadaP2 = null;

        // Objeto para rastrear quais teclas estão sendo pressionadas
        let teclasPressionadas = {};

        // Função para verificar jogadas simultâneas
        function verificarJogadas() {
          if (jogadaP1 && jogadaP2) {
            alert(`Jogador 1 escolheu: ${jogadaP1}, Jogador 2 escolheu: ${jogadaP2}`);
            
            // Aqui você pode adicionar a lógica para comparar as jogadas e decidir o vencedor
            
            jogadaP1 = null;
            jogadaP2 = null;
          }
        }

        document.addEventListener('keydown', function(e) {
          teclasPressionadas[e.key] = true; // Marca a tecla como pressionada
          //contador de inicio de partida
          function timerSet(duracao, display){
            timer = duracao, minutos, segundos
            setInterval(function(){
              minutos = parseInt(timer/60, 10);
              segundos = parseInt(timer%60,10)
              minutos = minutos < 10 ? "0" + minutos : minutos
              segundos = segundos < 10 ? "0" + segundos : segundos

              display.textContent = minutos +":"+segundos   

              timer = timer < 0 ? duracao : timer;


            },1000)
          }
          let durat = 3
          let tela = document.getElementById('blocoContagem')
          if (teclasPressionadas['t']) {
            timerSet(durat,tela)

          }
          
          // Jogador 1 (teclas W, A, D)
          if (teclasPressionadas['w']) {
            jogadaP1 = 'Tesoura';
            imagemDinamica1.src = "../DUELO_JKP/IMAGENS_JKP/tesourareal.png";
          } else if (teclasPressionadas['a']) {
            jogadaP1 = 'Papel';
            imagemDinamica1.src = "../DUELO_JKP/IMAGENS_JKP/papelreal.png";
          } else if (teclasPressionadas['d']) {
            jogadaP1 = 'Pedra';
            imagemDinamica1.src = "../DUELO_JKP/IMAGENS_JKP/pedrareal.png";
          }

          // Jogador 2 (teclas I, J, L)
          if (teclasPressionadas['i']) {
            jogadaP2 = 'Tesoura';
            imagemDinamica2.src = "../DUELO_JKP/IMAGENS_JKP/tesourareal.png";
          } else if (teclasPressionadas['j']) {
            jogadaP2 = 'Papel';
            imagemDinamica2.src = "../DUELO_JKP/IMAGENS_JKP/papelreal.png";
          } else if (teclasPressionadas['l']) {
            jogadaP2 = 'Pedraa';
            imagemDinamica2.src = "../DUELO_JKP/IMAGENS_JKP/pedrareal.png";
          }

          // Verifica se ambos os jogadores já fizeram suas escolhas
          verificarJogadas();
        });

        document.addEventListenerH('keyup', function(e) {
          teclasPressionadas[e.key] = false; // Reseta o estado da tecla ao ser solta
        });

  });
  
  
 
  