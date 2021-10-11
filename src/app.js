// Declaración de funciones
const randomStart = () => {
    let num = Math.floor(Math.random() * 90);
    return `${num}%`;
};

const randomColorAnimation = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const clearWindow = () => {
    let container = document.querySelector("#container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

// ----------- PROBLEMA -----------
//Linea 16: << el.style.animation = "fly linear 8s" >> resetea un poco la animación
const clearWindowPower = (element) => {
    // no he logrado que funcione el ralentizarlos...
    // let aliensList = document.querySelectorAll(".alienDiv")
    // aliensList.forEach(el => {
    //    el.style.animation = "fly linear 8s";
    // });

    // Eliminando todos los hijos de un elemento
    clearWindow();

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
        powerList[powerCount - 1].addEventListener("click", clearWindowPower)
    }
};

const removeLife = () => {
    lifes--;
    let lifesList = document.querySelectorAll(".life");
    lifesList[lifes].style.color = "white";
};

// los aliens mueren por defecto al llegar al final de la animación
const alienArrivesTop = (element) => {
    let killedMartian = document.querySelector(`#${element.target.childNodes[0].id}`).parentNode;
    killedMartian.parentNode.removeChild(killedMartian);

    removeLife();
    if(lifes === 0) {
        clearInterval(alienInterval);
        clearWindow();
        alert("You Lose!");
    }
};

// los aliens mueren onclick
function killAlien(element) {
    // si muere un alien 'neon' baja la velociadad de los aliens en pantalla
    if (element.target.classList[3] === "neonClass") addPower();
    let killedMartian = document.querySelector(`#${element.target.id}`).parentNode;
    killedMartian.parentNode.removeChild(killedMartian);
}

// Declaración de variables
let aliensColorAnimation = [["orangered", "9s linear"], ["cyan", "6s ease"], ["deeppink", "4s ease-out"], ["lime", "10s ease-in-out"], ["red", "10s ease-in"], ["yellow", "5s linear"]]
let alienId = 0;
let powerCount = 0;
let lifes = 10;

const renderAlien = (isNeon = null) => {
    let myContainer = document.querySelector("#container");
    let myAlien = document.createElement("div");
    let porcentaje = randomStart();
    let alienState = isNeon ? ["white", "neon 3s linear", "neonClass"] : randomColorAnimation(aliensColorAnimation);

    myAlien.onclick = killAlien;
    myAlien.classList.add("alienDiv");
    myAlien.style.left = isNeon ? "100%" : porcentaje;
    if (isNeon) myAlien.style.top = porcentaje;
    // animación
    myAlien.style.WebkitAnimation = isNeon ? alienState[1] : `fly ${alienState[1]}`; // Code for Chrome, Safari and Opera
    myAlien.style.animation = isNeon ? alienState[1] : `fly ${alienState[1]}`;       // Standard syntax
    // añadimos el dibujo del alien
    myAlien.innerHTML = `<i id="alien${alienId}" class="fab fa-reddit-alien alien ${isNeon ? alienState[2] : ''}" style="color: ${alienState[0]};"></i>`;

    myContainer.appendChild(myAlien);

    // Code for Chrome, Safari and Opera
    document.querySelector(`#alien${alienId}`).parentNode.addEventListener("webkitAnimationEnd", alienArrivesTop);
    // Standard syntax
    document.querySelector(`#alien${alienId}`).parentNode.addEventListener("animationend", alienArrivesTop);

    alienId++;

    if (alienId % 15 == 0) renderAlien(true);
}

// window.onload = renderAlien(true);


// Define cada cuanto tiempo (ms) aparece un alien
let alienInterval = window.setInterval(renderAlien, 1000);

// Difficulty:
// 700 ms => medium

