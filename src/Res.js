
var imagenes = {
    jugador : "res/jugador.png",
    fondo : "res/fondo.png",
    suelo : "res/suelo.png",
    bloque: "res/bloque.png",
    bloque_apoyo: "res/bloque_apoyo.png",
    triangulo: "res/triangulo.png",
    pincho: "res/pinchos.png",
    animacion_jugador: "res/animacion_jugador.png",
    animacion_jugador_derecha: "res/jugador_derecha.png",

};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}