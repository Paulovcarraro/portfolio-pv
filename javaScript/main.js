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

//  POPUP WHATSAPP

// Seleção dos elementos
const btnWhats = document.querySelector(".btn-whatsapp");
const popupOverlay = document.getElementById("whatsapp-popup-overlay");
const popupClose = document.getElementById("whatsapp-popup-close");
const popupSend = document.getElementById("whatsapp-popup-btn");

// Abrir popup
btnWhats.addEventListener("click", (e) => {
  e.preventDefault();
  popupOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Fechar popup
popupClose.addEventListener("click", () => {
  popupOverlay.classList.remove("active");
  document.body.style.overflow = "";
});
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Enviar mensagem
popupSend.addEventListener("click", () => {
  const phoneNumber = "5544999256382"; // seu número
  const message = encodeURIComponent(
    "Olá Paulo! Gostaria de saber mais sobre seus serviços."
  );
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  popupOverlay.classList.remove("active");
  document.body.style.overflow = "";
});
