// ====== DOM Elements ======
const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const menuBtnIcon = menuBtn?.querySelector("i");

const sideNav = document.getElementById("sideNav");
const overlay = document.getElementById("mobileNavOverlay");
const closeBtn = document.getElementById("closeBtn");
const toggleButton = document.getElementById("mobileNavToggle") || menuBtn; // fallback

// ====== Toggle Sidebar (Right-Side Nav) ======
function showSidebar() {
  sideNav?.classList.add("open");
  overlay?.classList.add("open");
}

function hideSidebar() {
  sideNav?.classList.remove("open");
  overlay?.classList.remove("open");
}

toggleButton?.addEventListener("click", showSidebar);
closeBtn?.addEventListener("click", hideSidebar);
overlay?.addEventListener("click", hideSidebar);

// ====== Responsive Behaviors ======
function closeMenuIfDesktop() {
  if (window.innerWidth > 768) {
    navLinks?.classList.remove("open");
    menuBtnIcon?.classList.remove("fa-xmark");
    menuBtnIcon?.classList.add("fa-caret-down");
    hideSidebar();
  }
}

// Debounce helper
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

window.addEventListener("resize", debounce(closeMenuIfDesktop, 150));
window.addEventListener("load", closeMenuIfDesktop);

// ====== ScrollReveal Animations ======
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  reset: false,
  mobile: true,
};

if (typeof ScrollReveal !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  ScrollReveal().reveal(".header__btn", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".about__content .about__btn", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".service__card", { ...scrollRevealOption, interval: 500 });
  ScrollReveal().reveal(".portfolio__card", { duration: 1000, interval: 500 });
}

// ====== Typing Effect ======
function startTypingEffect(selector, speed = 50) {
  const container = document.querySelector(selector);
  if (!container) return;

  const nodes = Array.from(container.childNodes);
  container.innerHTML = "";

  let contentArray = [];

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      contentArray.push({ type: "text", text: node.textContent });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      contentArray.push({
        type: "element",
        text: node.textContent,
        tag: node.tagName.toLowerCase(),
        className: node.className,
      });
    }
  });

  let currentIndex = 0;
  let charIndex = 0;
  let currentSpan = null;

  function type() {
    if (currentIndex >= contentArray.length) return;

    const current = contentArray[currentIndex];

    if (!currentSpan) {
      currentSpan = document.createElement(current.type === "text" ? "span" : current.tag);
      if (current.className) currentSpan.className = current.className;
      container.appendChild(currentSpan);
    }

    currentSpan.textContent += current.text[charIndex];
    charIndex++;

    if (charIndex >= current.text.length) {
      currentIndex++;
      charIndex = 0;
      currentSpan = null;
    }

    setTimeout(type, speed);
  }

  type();
}

// Optional: Activate with startTypingEffect(".typing-container");

// ====== Progress Bar Animation ======
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

function animateProgressBars() {
  document.querySelectorAll(".progress-bar").forEach((bar) => {
    const value = bar.dataset.progress;
    if (isInViewport(bar) && !bar.classList.contains("animated")) {
      bar.style.width = value + "%";
      bar.classList.add("animated");
    }
  });
}

window.addEventListener("scroll", animateProgressBars);
window.addEventListener("load", animateProgressBars);

// ====== Modal Handling ======
const modal = document.getElementById("contactModal");
const btn = document.getElementById("getStartedBtn");
const span = document.getElementById("closeModal");

window.addEventListener("load", () => {
  if (modal) modal.style.display = "none";
});

btn?.addEventListener("click", () => {
  if (modal) modal.style.display = "block";
});

span?.addEventListener("click", () => {
  if (modal) modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Floating Nav Toggle
const floatingBtn = document.getElementById("floatingNavBtn");
const floatingMenu = document.getElementById("floatingMenu");

floatingBtn.addEventListener("click", () => {
  floatingMenu.style.display = floatingMenu.style.display === "flex" ? "none" : "flex";
});

// Optional: Hide menu when clicking outside
document.addEventListener("click", (e) => {
  if (!floatingBtn.contains(e.target) && !floatingMenu.contains(e.target)) {
    floatingMenu.style.display = "none";
  }
});

    const toggleContactFormBtn = document.getElementById("toggleContactForm");
    const sideContactForm = document.getElementById("sideContactForm");
    toggleContactFormBtn.addEventListener("click", () => {
        const isOpen = sideContactForm.style.display === "block";
        sideContactForm.style.display = isOpen ? "none" : "block";
        toggleContactFormBtn.setAttribute("aria-expanded", !isOpen);
    });
