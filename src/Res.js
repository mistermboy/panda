
var imagenes = {
    boton_jugar : "res/boton_jugar.png",
    boton_pausa : "res/boton_pausa.png",
    mensaje_como_jugar : "res/mensaje_como_jugar.png",
    mensaje_ganar : "res/mensaje_ganar.png",
    mensaje_perder : "res/mensaje_perder.png",
    menu_fondo : "res/menu_fondo.png",
    jugador_arriba : "res/jugador_arriba.png",
    jugador_derecha : "res/jugador_derecha.png",
    jugador_abajo : "res/jugador_abajo.png",
    jugador_izquierda : "res/jugador_izquierda.png",
    fondo : "res/fondo.png",
    suelo : "res/suelo.png",
    bloque: "res/bloque.png",
    bloque_apoyo: "res/bloque_apoyo.png",
    triangulo: "res/triangulo.png",
    triangulo_apoyo: "res/triangulo_apoyo.png",
    triangulo_volteado: "res/triangulo_volteado.png",
    pincho: "res/pinchos.png",
    animacion_saltar_arriba: "res/animacion_saltar_arriba.png",
    animacion_saltar_derecha: "res/animacion_saltar_derecha.png",
    animacion_saltar_abajo: "res/animacion_saltar_abajo.png",
    animacion_saltar_izquierda: "res/animacion_saltar_izquierda.png",
    animacion_morir: "res/jugador_animacion_morir.png",
    gravity_up: "res/gravity_up.png",
    gravity_down: "res/gravity_down.png",
    nave: "res/nave_parpadeo.png",
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