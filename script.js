const botaoReiniciar = document.getElementById("btn-reiniciar");
const refreshIcon = document.getElementById("refresh-icon");

botaoReiniciar.addEventListener("click", function () {
    refreshIcon.classList.add("rotatingSVG");

    setTimeout(() => refreshIcon.classList.remove("rotatingSVG"), 500);
})