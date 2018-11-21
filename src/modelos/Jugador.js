class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador_arriba , x, y)
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
            this.ancho, this.alto, 0.1, 7, this.finAnimacionSaltar.bind(this) );

        this.saltoAbajo = new Animacion(imagenes.animacion_saltar_abajo,
            this.ancho, this.alto,0.1, 7, this.finAnimacionSaltar.bind(this) );

        this.saltoIzquierda = new Animacion(imagenes.animacion_saltar_izquierda,
            this.ancho, this.alto, 0.1, 7, this.finAnimacionSaltar.bind(this) );

        this.saltoArriba = new Animacion(imagenes.animacion_saltar_arriba,
            this.ancho, this.alto, 0.1, 7, this.finAnimacionSaltar.bind(this) );



        this.orientacionesSalto = [];
        this.orientaciones = [];


        this.orientacionesSalto.push(this.saltoDerecha);
        this.orientacionesSalto.push(this.saltoAbajo);
        this.orientacionesSalto.push(this.saltoIzquierda);
        this.orientacionesSalto.push(this.saltoArriba);

        this.orientaciones.push(this.derecha);
        this.orientaciones.push(this.abajo);
        this.orientaciones.push(this.izquierda);
        this.orientaciones.push(this.arriba);

        this.indice = 0;

        this.animacion = this.arriba;

        this.vx = 7; // velocidadX
        this.vy = 0; // velocidadY
        this.bloques = [];

    }


    actualizar(){
        this.animacion.actualizar();

        if(this.indice == 4)
            this.indice = 0;
    }

    saltar() {
        if (this.isInTheFloor()) {
            this.vy = -14;
            this.animacion = this.orientacionesSalto[this.indice];
        }
    }



    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
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
        this.animacion = this.orientaciones[this.indice++];
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


}