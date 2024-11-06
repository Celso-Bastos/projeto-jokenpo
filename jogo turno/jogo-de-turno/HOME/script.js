// funçao que possibilita o boao redirecionar a pessoa para a outra pagina
document.getElementById("butao").addEventListener("click", function() {
  window.location.href = "../DUELO_GAME/duel.html";
});
document.getElementById("butao1").addEventListener("click", function() {
  window.location.href = "../DUELO_AJUDA/ajuda.html";
});
//quando o mouse passar por cima do botao ele muda de cor
document.getElementById("butao").addEventListener("mouseenter", function() {
  this.style.background = "linear-gradient(to right, #ff0000, black)";
});
// retorna a cor original do botao
document.getElementById("butao").addEventListener("mouseleave", function() {
  this.style.background = "linear-gradient(to right, #d10000, black)";
});
//quando o mouse passar por cima do botao ele muda de cor
document.getElementById("butao1").addEventListener("mouseenter", function() {
  this.style.background = "linear-gradient(to right, #ff0000, black)";
});
// retorna a cor original do botao
document.getElementById("butao1").addEventListener("mouseleave", function() {
  this.style.background = "linear-gradient(to right, #d10000, black)";
});