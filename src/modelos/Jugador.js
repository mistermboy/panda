class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y)
        this.vidas = 3;
        this.tiempoInvulnerable = 0;


        this.arriba = new Animacion(imagenes.jugador_arriba,
            this.ancho, this.alto, 4, 1, null );

        this.derecha = new Animacion(imagenes.jugador_derecha,
            this.ancho, this.alto, 4, 1, null );

        this.abajo = new Animacion(imagenes.jugador_abajo,
            this.ancho, this.alto, 4, 1, null );

        this.izquierda = new Animacion(imagenes.jugador_izquierda,
            this.ancho, this.alto, 4, 1, null );

        this.saltoDerecha = new Animacion(imagenes.animacion_saltar_derecha,
            this.ancho, this.alto, 4, 1, null );

        this.saltoAbajo = new Animacion(imagenes.animacion_saltar_abajo,
            this.ancho, this.alto, 4, 1, null );

        this.saltoIzquierda = new Animacion(imagenes.animacion_saltar_izquierda,
            this.ancho, this.alto, 4, 1, null );

        this.saltoArriba = new Animacion(imagenes.animacion_saltar_arriba,
            this.ancho, this.alto, -1, 7, this.finAnimacionSaltar.bind(this) );

        this.vx = 7; // velocidadX
        this.vy = 0; // velocidadY

        this.animacion = this.normal;

        this.orientacionesSalto = [];

        this.orientaciones.push(this.saltoArriba);
        this.orientaciones.push(this.saltoDerecha);
        this.orientaciones.push(this.saltoAbajo;
        this.orientaciones.push(this.saltoIzquierda);


        this

        this.bloques = [];

    }


    actualizar(){

        this.animacion.actualizar();
    }

    saltar() {
        if (this.isInTheFloor()) {
            this.vy = -12;
            this.animacion = this.saltoDerecha;
        }
    }



    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }

    golpeado (){
        if (this.tiempoInvulnerable <= 0) {
            if (this.vidas > 0) {
                this.vidas--;
                this.tiempoInvulnerable = 100;
                // 100 actualizaciones de loop
            }
        }
    }



    isInTheFloor(){
        for(var i=0;i<this.bloques.length;i++){
            if(this.colisiona(this.bloques[i]))
                return true;
        }
        return false;

    }


    senBlocks(bloques){
        this.bloques = bloques;
    }


    finAnimacionSaltar(){
        this.animacion = this.derecha;
    }


}