var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    entrada = entradas.teclado;
    console.log(event.keyCode);
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch (event.keyCode) {
            case 32:
                controles.barspace = true;
                break;
        }
    }
}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice(posicion, 1);
    console.log("Tecla levantada");

    switch (event.keyCode) {
        case 32:
            controles.barspace = false;
    }

}

