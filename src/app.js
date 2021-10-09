const render = () => {

    // let martian = document.createElement("div");
    martian = `<div class="martian" onclick="killMartian();"><i class="fab fa-reddit-alien alien" style="color: white;"></i></div>`

    document.querySelector("#container").innerHTML = martian;
}
window.onload = render();

function killMartian () {
    document.querySelector(".martian").classList.add("killed");
}