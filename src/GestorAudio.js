
var musicaAmbiente = new Audio("res/musica_ambiente.mp3");
musicaAmbiente.loop = true;

var efectos = {
    muerte : "res/efecto_muerte.mp3",
}

function reproducirMusica() {
    musicaAmbiente.play();
}

function reiniciarMusica() {
    musicaAmbiente.pause();
    musicaAmbiente.load();
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.pause();
    musicaAmbiente.load();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}