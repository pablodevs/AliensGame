// we declare a new global variable containing an array that represents the ballons map
// you have to add more colors into the ballonsMap array
let ballonsMap = ['green', 'red', 'yellow', 'blue', 'blue', 'purple', 'brown', 'gray', 'yellow', 'red', 'pink', 'brown', 'red', 'yellow', 'blue', 'purple', 'brown', 'gray', 'purple', 'green'];

// poping a balloon is basically turning his color to null (no color)
const popBalloon = (position) => {
    // set the color to null on the balloon position
    let balloon = document.querySelector(`#balloon${position}`)
    balloon.classList.remove("active");
    balloon.classList.add("popped");
}

const render = () => {
    
    // convert ballons map of colors into real html balloons
    const ballons = ballonsMap.map((color, position) => {
        return `<div id="balloon${position}" class="balloon active" onclick="popBalloon(${position});" style="background-color: ${color};"></div>`; // <--- render each balloon
    });

    document.querySelector("#balloon-count").innerHTML = ballons.filter(b => b !== null).length; // <-- render the balloon count into the DOM
    document.querySelector("#balloon-map").innerHTML = ballons.join(''); // <-- render the balloons into the DOM

    // if(activeBalloons == 0) window.location.reload(); // <--- reload website when no more balloons are left
}

// this makes the "render" function trigger when the website starts existing
window.onload = render();