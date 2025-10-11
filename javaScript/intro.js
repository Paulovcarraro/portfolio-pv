// Quando o usuário clicar, faz uma animação de fade e redireciona
const btn = document.getElementById("enter-btn");

btn.addEventListener("click", () => {
  document.body.style.transition = "opacity 1s ease";
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "index.html"; // vai para seu portfólio
  }, 1000);
});
