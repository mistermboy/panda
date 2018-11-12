class Espacio {

    constructor(gravedad) {
        this.gravedad = gravedad;
        this.dinamicos = [];
        this.estaticos = [];
    }

    actualizar(){
        for( var i=0; i < this.dinamicos.length; i++){
            // aplicar gravedad ( dinamicos)
            this.dinamicos[i].vy = this.dinamicos[i].vy + this.gravedad;
            // maxima velocidad de caida por gravedad
            if (this.dinamicos[i].vy > 20) {
                this.dinamicos[i].vy = 20;
            }

            // reiniciar choques
            this.dinamicos[i].choqueAbajo = false;
            this.dinamicos[i].fueraPorDerecha = true;
            this.dinamicos[i].fueraPorIzquierda = true;

            //derecha
            this.moverDerecha(i);
            this.moverIzquierda(i);
            this.moverArriba(i);
            this.moverAbajo(i);
        }
    }

    moverAbajo(i){
        if ( this.dinamicos[i].vy > 0){
            var movimientoPosible = this.dinamicos[i].vy;
            // El mejor "idealmente" es la velocidad vy.

            for(var j=0; j < this.estaticos.length; j++){
                var arribaDinamico
                    = this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var abajoDinamico
                    = this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var derechaDinamico
                    = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var izquierdaDinamico
                    = this.dinamicos[i].x - this.dinamicos[i].ancho/2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto/2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto/2;
                var derechaEstatico
                    = this.estaticos[j].x + this.estaticos[j].ancho/2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho/2;

                // Choca!!
                if ( (abajoDinamico +  this.dinamicos[i].vy) >= arribaEstatico &&
                    (arribaDinamico +  this.dinamicos[i].vy) < abajoEstatico
                    && izquierdaDinamico < derechaEstatico
                    && derechaDinamico > izquierdaEstatico ){

                    if (derechaDinamico < derechaEstatico) {
                        this.dinamicos[i].fueraPorDerecha = false;
                    }

                    if (izquierdaDinamico > izquierdaEstatico) {
                        this.dinamicos[i].fueraPorIzquierda = false;
                    }

                    if (movimientoPosible >= arribaEstatico - abajoDinamico ){
                        // Más restrictivo que el anterior!
                        movimientoPosible = arribaEstatico - abajoDinamico  ;
                        this.dinamicos[i].choqueAbajo = true;

                        if (derechaDinamico <= derechaEstatico) {
                            this.dinamicos[i].fueraPorDerecha = false;
                        }

                        if (izquierdaDinamico >= izquierdaEstatico) {
                            this.dinamicos[i].fueraPorIzquierda = false;
                        }

                    }
                }
            }

            // Ya se han comprobado todos los estaticos
            this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
            this.dinamicos[i].vy = movimientoPosible;
        }
    }

    moverArriba(i){
        if ( this.dinamicos[i].vy < 0){
            var movimientoPosible = this.dinamicos[i].vy;
            // El mejor "idealmente" es la velocidad vy.

            for(var j=0; j < this.estaticos.length; j++){
                var arribaDinamico
                    = this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var abajoDinamico
                    = this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var derechaDinamico
                    = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var izquierdaDinamico
                    = this.dinamicos[i].x - this.dinamicos[i].ancho/2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto/2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto/2;
                var derechaEstatico
                    = this.estaticos[j].x + this.estaticos[j].ancho/2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho/2;

                // Choca!!, forzar x a la izquierda del estatico
                if ( (arribaDinamico +  this.dinamicos[i].vy) <= abajoEstatico &&
                    (abajoDinamico +  this.dinamicos[i].vy) > arribaEstatico
                    && izquierdaDinamico < derechaEstatico
                    && derechaDinamico > izquierdaEstatico ){

                    if (movimientoPosible >=
                        (arribaDinamico + this.dinamicos[i].vy) - abajoEstatico ){
                        // Más restrictivo que el anterior!
                        movimientoPosible = abajoEstatico - arribaDinamico ;
                    }

                }
            }

            this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
            this.dinamicos[i].vy = movimientoPosible;
        }
    }

    moverDerecha(i){
        if ( this.dinamicos[i].vx > 0){
            var movimientoPosible = this.dinamicos[i].vx;
            // El mejor "idealmente" es la x+vx.

            for(var j=0; j < this.estaticos.length; j++){
                var derechaDinamico
                    = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var arribaDinamico
                    = this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var abajoDinamico
                    = this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho/2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto/2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto/2;

                // Choca!!, forzar x a la izquierda del estatico
                if ( (derechaDinamico + this.dinamicos[i].vx) >= izquierdaEstatico
                    && arribaEstatico < abajoDinamico
                    && abajoEstatico > arribaDinamico ){

                    if (movimientoPosible >=
                        (derechaDinamico + this.dinamicos[i].vx) - izquierdaEstatico ){
                        // Se mueve menos que su vx porque no hay distancia
                        movimientoPosible = izquierdaEstatico - derechaDinamico ;
                    }

                }
            }
            // Ya se han comprobado todos los estaticos
            this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
            this.dinamicos[i].vx = movimientoPosible;
        }
    }


    moverIzquierda(i){

    // Izquierda
    if ( this.dinamicos[i].vx < 0){
        var movimientoPosible = this.dinamicos[i].vx;
        // El mejor "idealmente" es la velocidad vx.

        for(var j=0; j < this.estaticos.length; j++){
            var izquierdaDinamico
                = this.dinamicos[i].x - this.dinamicos[i].ancho/2;
            var arribaDinamico
                = this.dinamicos[i].y - this.dinamicos[i].alto/2;
            var abajoDinamico
                = this.dinamicos[i].y + this.dinamicos[i].alto/2;
            var derechaEstatico
                = this.estaticos[j].x + this.estaticos[j].ancho/2;
            var arribaEstatico
                = this.estaticos[j].y - this.estaticos[j].alto/2;
            var abajoEstatico
                = this.estaticos[j].y + this.estaticos[j].alto/2;
            // Choca!!, forzar x a la izquierda del estatico
            if ( (izquierdaDinamico + this.dinamicos[i].vx) <= derechaEstatico
                && arribaEstatico < abajoDinamico
                && abajoEstatico > arribaDinamico ){

                if (movimientoPosible <=
                    (izquierdaDinamico+this.dinamicos[i].vx)-derechaEstatico ){
                    // Más restrictivo que el anterior!
                    movimientoPosible = derechaEstatico - izquierdaDinamico ;
                }

            }
        }

        // Ya se han comprobado todos los estaticos
        this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
        this.dinamicos[i].vx = movimientoPosible;
    }

    }

    agregarCuerpoDinamico(modelo){
        this.dinamicos.push(modelo);
    }

    agregarCuerpoEstatico(modelo){
        this.estaticos.push(modelo);
    }

    eliminarCuerpoDinamico (modelo) {
        for (var i = 0; i < this.dinamicos.length; i++) {
            if (this.dinamicos[i] == modelo) {
                this.dinamicos.splice(i, 1);
            }
        }
    }

    eliminarCuerpoEstatico(modelo){
        for (var i = 0; i < this.estaticos.length; i++) {
            if (this.estaticos[i] == modelo) {
                this.estaticos.splice(i, 1);
            }
        }
    }

}