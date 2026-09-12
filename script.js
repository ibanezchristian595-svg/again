// If your anniversary year is different, change the date below.
const relationshipStart = new Date("2024-09-18T00:00:00");
const anniversaryDate = new Date("2026-09-18T00:00:00");

const days = Math.round((anniversaryDate - relationshipStart) / 86400000);
document.querySelector("#dayCount").textContent = days;

// Use the included placeholder whenever one of your three JPG photos is missing.
document.querySelectorAll("img[data-fallback]").forEach((image) => {
  image.addEventListener("error", () => {
    image.src = image.dataset.fallback;
  }, { once: true });
});

const dialog = document.querySelector("#surpriseDialog");
document.querySelector("#openSurprise").addEventListener("click", () => {
  dialog.showModal();
  createPetals(26);
});
document.querySelector("#closeSurprise").addEventListener("click", () => dialog.close());
document.querySelector("#continueButton").addEventListener("click", () => {
  dialog.close();
  document.querySelector("#memories").scrollIntoView({ behavior: "smooth" });
});

const envelope = document.querySelector("#envelope");
const letterButton = document.querySelector("#openLetter");
letterButton.addEventListener("click", () => {
  envelope.classList.toggle("open");
  const isOpen = envelope.classList.contains("open");
  letterButton.textContent = isOpen ? "Close my letter 💌" : "Tap to open my letter 💌";
  letterButton.setAttribute("aria-expanded", isOpen);
  if (isOpen) createPetals(18);
});

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelector("#photoNote").textContent = card.dataset.note;
  });
});

let love = 0;
document.querySelector("#heartButton").addEventListener("click", () => {
  love++;
  document.querySelector("#loveCounter").textContent = love === 1 ? "One heart sent to you ❤️" : `${love} hearts sent to you ❤️`;
  createPetals(8);
});

function createPetals(amount) {
  const layer = document.querySelector("#petals");
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = Math.random() > 0.35 ? "♥" : "✿";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${3 + Math.random() * 4}s`;
    petal.style.animationDelay = `${Math.random() * 1.5}s`;
    petal.style.fontSize = `${12 + Math.random() * 18}px`;
    layer.appendChild(petal);
    setTimeout(() => petal.remove(), 8500);
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
