// Declaración de funciones
const randomStart = () => {
    let num = Math.floor(Math.random() * 92);
    return `${num}%`;
};

const randomColorAnimation = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// ----------- PROBLEMA -----------
//Linea 16: << el.style.animation = "fly linear 8s" >> resetea un poco la animación
const clearWindow = () => {
// no he logrado que funcione el ralentizarlos...
    // let aliensList = document.querySelectorAll(".alienDiv")
    // aliensList.forEach(el => {
    //    el.style.animation = "fly linear 8s";
    // });

    // Eliminando todos los hijos de un elemento
    let container = document.querySelector("#container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

// los aliens mueren por defecto al llegar al final de la animación
const myEndFunction = (element) => {
    let killedMartian = document.querySelector(`#${element.target.childNodes[0].id}`).parentNode;
    killedMartian.parentNode.removeChild(killedMartian);
};

// los aliens mueren onclick
function killMartian(element) {
    // si muere un alien 'neon' baja la velociadad de los aliens en pantalla
    if (element.target.classList[3] === "neonClass") clearWindow();
    let killedMartian = document.querySelector(`#${element.target.id}`).parentNode;
    killedMartian.parentNode.removeChild(killedMartian);
}

// Declaración de variables
let aliensColorAnimation = [["orangered", "15s linear"], ["cyan", "10s ease"], ["deeppink", "3.5s ease-out"], ["lime", "10s ease-in-out"], ["red", "10s ease-in"], ["yellow", "5s linear"]]
let alienId = 0;

const renderAlien = (isNeon = null) => {
    let myContainer = document.querySelector("#container");
    let myAlien = document.createElement("div");
    let porcentaje = randomStart();
    let alienState = isNeon ? ["white", "neon 2.5s linear", "neonClass"] : randomColorAnimation(aliensColorAnimation);

    myAlien.onclick = killMartian;
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
    document.querySelector(`#alien${alienId}`).parentNode.addEventListener("webkitAnimationEnd", myEndFunction);
    // Standard syntax
    document.querySelector(`#alien${alienId}`).parentNode.addEventListener("animationend", myEndFunction);

    alienId++;

    if (alienId % 15 == 0) renderAlien(true);
}



// Define cada cuanto tiempo (ms) aparece un alien
var alienInterval = window.setInterval(renderAlien, 700);

// Difficulty:
// 700 ms => medium

