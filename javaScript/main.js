// --- Menu hamburger ---
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
    }
  });
}

// --- Serviços ---
function toggleCard(element) {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    if (card !== element) card.classList.remove("expanded");
  });

  element.classList.toggle("expanded");
}

// --- Botão Ver Mais e Ver Menos (Projetos) ---
document.querySelectorAll(".btn-vermais").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const cardContainer = document.getElementById(targetId);

    if (cardContainer) {
      cardContainer.classList.toggle("show-all");
      button.textContent = cardContainer.classList.contains("show-all")
        ? "Ver Menos"
        : "Ver Mais";
    }
  });
});

// --- POPUP WHATSAPP ---
const btnWhats = document.querySelector(".btn-whatsapp");
const popupOverlay = document.getElementById("whatsapp-popup-overlay");
const popupClose = document.getElementById("whatsapp-popup-close");
const popupSend = document.getElementById("whatsapp-popup-btn");

if (btnWhats && popupOverlay) {
  btnWhats.addEventListener("click", (e) => {
    e.preventDefault();
    popupOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  if (popupClose) {
    popupClose.addEventListener("click", () => {
      popupOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  if (popupSend) {
    popupSend.addEventListener("click", () => {
      const phoneNumber = "5544999256382";
      const message = encodeURIComponent(
        "Olá Paulo! Gostaria de saber mais sobre seus serviços.",
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
      popupOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
}

// --- Rolagem personalizada (Botão Contato Hero) ---
const btnContatoHero = document.getElementById("btn-contato-hero");
if (btnContatoHero) {
  btnContatoHero.addEventListener("click", function (e) {
    e.preventDefault();
    const targetSection = document.getElementById("contato");
    const header = document.querySelector(".header");

    if (targetSection && header) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
}

// --- Animação da Timeline ---
// Usando IntersectionObserver para ser mais profissional que o window.onload
const initTimeline = () => {
  const timeline = document.querySelector(".timeline");
  const sectionFormacao = document.querySelector("#formacao");

  if (timeline && sectionFormacao) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeline.classList.add("animate");
            console.log("Timeline animada com sucesso!");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionFormacao);
  }
};

// Garante que o script rode apenas após o HTML carregar
document.addEventListener("DOMContentLoaded", initTimeline);
