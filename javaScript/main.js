// =========================================================
// CARRARO SOLUTIONS — main.js
// =========================================================

// --- Barra de progresso de leitura ---
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);

// --- Header: estado ao rolar + progresso + link ativo ---
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav a[href^='#']");
const trackedSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (header) header.classList.toggle("scrolled", scrollTop > 40);
  progressBar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : "0";

  // Link ativo no menu (scrollspy)
  const offset = (header ? header.offsetHeight : 0) + 120;
  let currentId = "";
  trackedSections.forEach((section) => {
    if (section.offsetTop - offset <= scrollTop) currentId = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// --- Menu hamburger ---
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

function closeMenu() {
  if (hamburger) hamburger.classList.remove("active");
  if (navMenu) navMenu.classList.remove("show");
}

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Fecha o menu ao escolher um item
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

// --- Serviços (acordeão) ---
function toggleCard(element) {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    if (card !== element) card.classList.remove("expanded");
  });

  element.classList.toggle("expanded");
}

// --- Botão Ver Mais e Ver Menos (Projetos) ---
document.querySelectorAll(".btn-vermais").forEach((button) => {
  const textoOriginal = button.textContent.trim();

  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const cardContainer = document.getElementById(targetId);

    if (cardContainer) {
      cardContainer.classList.toggle("show-all");
      button.textContent = cardContainer.classList.contains("show-all")
        ? "Ver Menos"
        : textoOriginal;
    }
  });
});

// --- Efeito ripple (animação de clique) ---
const rippleSelector = [
  ".btn-cta",
  ".btn-vermais",
  ".btn-projeto-moderno",
  ".resume-link",
  ".contato-btn",
  ".whatsapp-popup-btn",
  ".card-header",
].join(",");

document.addEventListener("click", (e) => {
  const target = e.target.closest(rippleSelector);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");

  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

  target.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
});

// --- Animações de entrada ao rolar a página ---
const revealTargets = [
  { selector: "#sobre > *", step: 0.12 },
  { selector: ".categoria-titulo", step: 0 },
  { selector: ".card-moderno:not(.extra)", step: 0.1 },
  { selector: ".centered-btn", step: 0 },
  { selector: "#servicos > h2", step: 0 },
  { selector: ".servicos-cards .card", step: 0.06 },
  { selector: "#formacao .section-title", step: 0 },
  { selector: ".divisor-recursos", step: 0 },
  { selector: ".resume-card", step: 0.12 },
  { selector: "#orcamento > *", step: 0.1 },
  { selector: "#contato > *", step: 0.1 },
  { selector: ".contato-btn", step: 0.1 },
  { selector: "#projetos .section-title", step: 0 },
  { selector: ".footer-container > *", step: 0.12 },
];

const revealElements = new Set();

revealTargets.forEach(({ selector, step }) => {
  document.querySelectorAll(selector).forEach((el, index) => {
    // Evita animar o container pai e depois os filhos de novo
    if (el.classList.contains("fade-up")) {
      revealElements.add(el);
      return;
    }
    el.classList.add("reveal");
    // Atraso escalonado, reiniciando a cada grupo de 3 para não demorar demais
    if (step) el.style.setProperty("--delay", `${(index % 3) * step}s`);
    revealElements.add(el);
  });
});

// Seções marcadas com .fade-up no HTML (ex.: #sobre) também precisam ser reveladas
document.querySelectorAll(".fade-up").forEach((el) => revealElements.add(el));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  // Navegadores antigos: mostra tudo
  revealElements.forEach((el) => el.classList.add("visible"));
}

// --- Brilho que acompanha o mouse nos cards ---
document.querySelectorAll(".card-moderno").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

// --- Brilho que acompanha o mouse no Hero ---
const hero = document.querySelector(".hero");
if (hero && window.matchMedia("(hover: hover)").matches) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    hero.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
}

// --- POPUP WHATSAPP ---
const btnWhats = document.querySelector(".btn-whatsapp");
const popupOverlay = document.getElementById("whatsapp-popup-overlay");
const popupClose = document.getElementById("whatsapp-popup-close");
const popupSend = document.getElementById("whatsapp-popup-btn");

function closePopup() {
  popupOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (btnWhats && popupOverlay) {
  btnWhats.addEventListener("click", (e) => {
    e.preventDefault();
    popupOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  if (popupClose) popupClose.addEventListener("click", closePopup);

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) closePopup();
  });

  // Fecha com a tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupOverlay.classList.contains("active")) {
      closePopup();
    }
  });

  if (popupSend) {
    popupSend.addEventListener("click", () => {
      const phoneNumber = "5544999256382";
      const message = encodeURIComponent(
        "Olá Paulo! Gostaria de saber mais sobre seus serviços.",
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
      closePopup();
    });
  }
}

// --- Rolagem personalizada (Botão Contato Hero) ---
const btnContatoHero = document.getElementById("btn-contato-hero");
if (btnContatoHero) {
  btnContatoHero.addEventListener("click", function (e) {
    e.preventDefault();
    const targetSection = document.getElementById("contato");
    const headerEl = document.querySelector(".header");

    if (targetSection && headerEl) {
      const headerHeight = headerEl.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
}

// --- Animação da Timeline ---
const initTimeline = () => {
  const timeline = document.querySelector(".timeline");
  const sectionFormacao = document.querySelector("#formacao");

  if (timeline && sectionFormacao) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeline.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionFormacao);
  }
};

document.addEventListener("DOMContentLoaded", initTimeline);

// --- Formulário de orçamento ---
const form = document.getElementById("orcamentoForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const nome = form.nome.value;
    const telefone = form.telefone.value;
    const email = form.email.value;
    const servico = form.servico.value;
    const descricao = form.descricao.value;

    if (submitBtn) submitBtn.classList.add("loading");

    try {
      // Só envia por e-mail se o EmailJS estiver carregado na página
      if (typeof emailjs !== "undefined") {
        await emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
          nome,
          telefone,
          email,
          servico,
          descricao,
        });
      }

      const mensagem = `
Olá Paulo!

Gostaria de solicitar um orçamento.

📌 Serviço: ${servico}

👤 Nome: ${nome}

📱 Telefone: ${telefone}

📧 Email: ${email}

📝 Descrição:
${descricao || "Não informado"}
`;

      const numero = "5544999256382";

      window.open(
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
        "_blank",
      );

      alert("Solicitação enviada com sucesso!");

      form.reset();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao enviar solicitação.");
    } finally {
      if (submitBtn) submitBtn.classList.remove("loading");
    }
  });
}