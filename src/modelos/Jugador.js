class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y)
        this.vidas = 3;
        this.tiempoInvulnerable = 0;


        this.normal = new Animacion(imagenes.jugador,
            this.ancho, this.alto, 4, 1, null );

        this.derecha = new Animacion(imagenes.animacion_jugador_derecha,
            this.ancho, this.alto, 4, 1, null );

        this.saltoDerecha = new Animacion(imagenes.animacion_jugador,
            this.ancho, this.alto, 4, 4, this.finAnimacionSaltar.bind(this) );

        this.vx = 3; // velocidadX
        this.vy = 0; // velocidadY

        this.animacion = this.normal;

        this.bloques = [];

    }


    actualizar(){

        this.animacion.actualizar();
    }

    saltar() {
        if (this.isInTheFloor()) {
            this.vy = -10;
            this.vx = 10;
            this.enElAire = true;
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