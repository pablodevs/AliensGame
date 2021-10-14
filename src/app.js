/* eslint-disable */
import "bootstrap";
import "./style.css";

// Declaración de funciones

const randomStart = () => {
  let num = Math.floor(Math.random() * 90);
  return `${num}%`;
};

const randomAlien = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const removeShine = () => {
  myContainer.classList.remove("shine-effect");
};

const clearWindow = isPower => {
  if (isPower) {
    myContainer.classList.add("shine-effect");
    // Remove class shine-effect when animation end
    myContainer.addEventListener("webkitAnimationEnd", removeShine);
    myContainer.addEventListener("animationend", removeShine);

    let delay = 200; // 0.4 second
    setTimeout(() => {
      while (myContainer.firstChild) {
        incrementPoints();
        container.removeChild(container.firstChild);
      }
    }, delay);
  } else {
    while (myContainer.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
};

// ----------- PROBLEMA -----------
//Linea 16: << el.style.animation = "fly linear 8s" >> resetea un poco la animación
const clearWindowPower = element => {
  // no he logrado que funcione el ralentizarlos...
  // let aliensList = document.querySelectorAll(".alienDiv")
  // aliensList.forEach(el => {
  //    el.style.animation = "fly linear 8s";
  // });

  // Eliminando todos los hijos de un elemento
  clearWindow(true);

  let powerOff = document.querySelector(`#${element.target.id}`);
  powerOff.classList.remove("power-active");
  powerOff.removeEventListener("click", clearWindowPower);
  powerCount--;
};

const addPower = () => {
  if (powerCount < 10) {
    powerCount++;
    let powerList = document.querySelectorAll(".power");
    powerList[powerCount - 1].classList.add("power-active");
    powerList[powerCount - 1].addEventListener("click", clearWindowPower);
  }
};

const removeLife = () => {
  lifes--;
  let lifesList = document.querySelectorAll(".life");
  lifesList[lifes].style.color = "white";
};

// los aliens mueren por defecto al llegar al final de la animación
const alienArrivesTop = element => {
  let killedMartian = document.querySelector(
    `#${element.target.childNodes[0].id}`
  ).parentNode;
  killedMartian.parentNode.removeChild(killedMartian);

  removeLife();
  if (lifes === 0) {
    clearWindow();
    clearInterval(interval); // Termina el juego
    myModal.toggle();
  }
};

const incrementPoints = () => {
  points++;
  document.querySelector("#actual-points").innerHTML = points;
};

// los aliens mueren onclick
const killAlien = element => {
  // si muere un alien 'neon' añade un poder a la lista de poderes
  if (element.target.classList[3] === "neonClass") addPower();
  let killedMartian = document.querySelector(`#${element.target.id}`)
    .parentNode;
  killedMartian.parentNode.removeChild(killedMartian);

  incrementPoints();
};

const setDifficulty = event => {
  document.querySelector("#start").value = event.target.value;
};

const addPowersAndLifes = () => {
  for (let i = 0; i < 10; i++)
    document.querySelector(
      ".powers-container"
    ).innerHTML += `<button id="power${i}" class="fab fa-superpowers power"></button>`;
  for (let j = 0; j < 10; j++)
    document.querySelector(
      ".lifes-container"
    ).innerHTML += `<i class="fas fa-heart life"></i>`;
};

const startGame = event => {
  powerCount = 0;
  lifes = 10;
  points = 0;
  interval = window.setInterval(renderAlien, event.target.value); // Define cada cuanto tiempo (ms) aparece un alien
};

// función que crea los aliens
const renderAlien = (isNeon = null) => {
  let myAlien = document.createElement("div"),
    porcentaje = randomStart(),
    alienState = isNeon
      ? ["white", "neon 3s linear", "neonClass"]
      : randomAlien(typesOfAliens);

  myAlien.onclick = killAlien;
  myAlien.classList.add("alienDiv");
  myAlien.style.left = isNeon ? "100%" : porcentaje;
  if (isNeon) myAlien.style.top = porcentaje;
  // animación
  myAlien.style.WebkitAnimation = isNeon
    ? alienState[1]
    : `fly ${alienState[1]}`; // Code for Chrome, Safari and Opera
  myAlien.style.animation = isNeon ? alienState[1] : `fly ${alienState[1]}`; // Standard syntax
  // añadimos el dibujo del alien
  myAlien.innerHTML = `<i id="alien${alienId}" class="fab fa-reddit-alien alien ${
    isNeon ? alienState[2] : ""
  }" style="color: ${alienState[0]};"></i>`;

  myContainer.appendChild(myAlien);

  // Code for Chrome, Safari and Opera
  document
    .querySelector(`#alien${alienId}`)
    .parentNode.addEventListener("webkitAnimationEnd", alienArrivesTop);
  // Standard syntax
  document
    .querySelector(`#alien${alienId}`)
    .parentNode.addEventListener("animationend", alienArrivesTop);

  alienId++;

  if (alienId % 10 == 0) renderAlien(true);
}; // window.onload = renderAlien(true);

// Declaración de variables globales
let typesOfAliens = [
    ["orangered", "6s linear"],
    ["cyan", "5s ease"],
    ["deeppink", "4s ease-out"],
    ["lime", "7s ease-in-out"],
    ["red", "7s ease-in"],
    ["yellow", "5s linear"]
  ],
  alienId = 0,
  powerCount,
  lifes,
  points = 0,
  myContainer = document.querySelector("#container"),
  interval;

document
  .querySelectorAll(".difficulty")
  .forEach(e => e.addEventListener("click", setDifficulty));
document.querySelector("#start").addEventListener("click", startGame);

addPowersAndLifes();

// Aparece el Modal
const myModal = new bootstrap.Modal(document.querySelector("#mymodal1"), {
  keyboard: false
});
myModal.toggle();

////     Falta el pausar el juego + Renaudar cuando
////     el usuario esté fuera de la pantalla
