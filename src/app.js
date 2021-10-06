// we declare a new global variable containing an array that represents the ballons map
// you have to add more colors into the ballonsMap array
let ballonsColors = ['green', 'red', 'yellow', 'blue', 'purple', 'brown', 'gray', 'pink'];
let activeBalloons;
let ballonsMap;

// poping a balloon is basically turning his color to null (no color)
const popBalloon = (position) => {
    // set the color to null on the balloon position
    let balloon = document.querySelector(`#balloon${position}`)
    balloon.classList.remove("active");
    balloon.classList.add("popped");

    ballonsMap[position] = null;
    activeBalloons--;

    if (ballonsMap.every(elem => elem === null)) render(); // true => restart the balloons
    document.querySelector("#balloon-count").innerHTML = activeBalloons;
}

const render = () => {
    activeBalloons = 20;
    ballonsMap = [];
    for (let i = 0; i < 20; i++) ballonsMap.push(ballonsColors[Math.floor(Math.random()*8)]);
    // convert ballons map of colors into real html balloons
    const ballons = ballonsMap.map((color, position) => {
        return `<div id="balloon${position}" class="balloon active" onclick="popBalloon(${position});" style="background-color: ${color};"></div>`; // <--- render each balloon
    });

    document.querySelector("#balloon-count").innerHTML = ballons.filter(b => b !== null).length; // <-- render the balloon count into the DOM
    document.querySelector("#balloon-map").innerHTML = ballons.join(''); // <-- render the balloons into the DOM
}

// this makes the "render" function trigger when the website starts existing
window.onload = render();