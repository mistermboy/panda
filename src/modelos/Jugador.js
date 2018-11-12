class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y)
        this.vidas = 3;
        this.tiempoInvulnerable = 0;

        this.vx = 3; // velocidadX
        this.vy = 0; // velocidadY

    }


    saltar(){
        if ( !this.enElAire ) {
            this.vy = -10;
            this.enElAire = true;
        }
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