// BOTÃO EXPLORAR

document.getElementById("explorarBtn").addEventListener("click", () => {
  document.getElementById("sobre").scrollIntoView({
    behavior: "smooth"
  });
});

// NAVBAR SCROLL

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ANIMAÇÃO REVEAL

const reveals = document.querySelectorAll(".reveal");

function revealElements() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if(elementTop < windowHeight - 100){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealElements);
revealElements();

// CONTADOR ANIMADO

const counters = document.querySelectorAll(".counter");

const startCounter = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const updateCounter = () => {
      const increment = target / 100;

      if(count < target){
        count += increment;
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
};

let started = false;

window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".stats-section");

  const sectionTop = statsSection.getBoundingClientRect().top;

  if(sectionTop < window.innerHeight && !started){
    startCounter();
    started = true;
  }
});