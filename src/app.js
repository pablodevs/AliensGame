const randomStart = () => {
    let num = Math.floor(Math.random()*92);
    return `${num}%`;
};

const randomColor = (array) => {
    return array[Math.floor(Math.random()*array.length)];
};

let martiansColor = ["orangered", "cyan", "deeppink", "lime", "red", "yellow"]
let cont = 0;

const renderMartian = () => {

    let myMartian = document.createElement("div");

    myMartian.onclick = killMartian;
    myMartian.classList.add("alienDiv");
    
    let porcentaje = randomStart();
    myMartian.style.left = porcentaje;

    myMartian.innerHTML = `<i id="martian${cont}" class="fab fa-reddit-alien alien" style="color: ${randomColor(martiansColor)};"></i>`;

    let myContainer = document.querySelector("#container");

    myContainer.appendChild(myMartian);
    cont++;
}

function killMartian (element) {
    let killedMartian = document.querySelector(`#${element.target.id}`).parentNode;
    killedMartian.parentNode.removeChild(killedMartian);
}

// Define cada cuanto tiempo (ms) aparece un martian
var martianInterval = window.setInterval(renderMartian, 3000);