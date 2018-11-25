var pulsaciones = []; // actuales registradas

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;

var entrada = entradas.teclado;


var nivelActual = 0;
var nivelMaximo = 2;

var cuerpo = {};
cuerpo.dinamico = 1;
cuerpo.estatico = 2;

var estados = {};
estados.abajo= 2;
estados.arriba = 3;
estados.muriendo = 4;
estados.muerto = 5;


var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;

var estadoJuego = estados.abajo;
