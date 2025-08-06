// Menu hamburger

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("show");
});

// Fecha o menu se clicar fora dele
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("show");
  }
});

// Script de funcionamento do botão Ver Mais e Ver Menos

document.querySelectorAll(".btn-vermais").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const cardContainer = document.getElementById(targetId);

    cardContainer.classList.toggle("show-all");

    if (cardContainer.classList.contains("show-all")) {
      button.textContent = "Ver Menos";
    } else {
      button.textContent = "Ver Mais";
    }
  });
});
