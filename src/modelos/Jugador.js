class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador_arriba , x, y)

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

        this.morir = new Animacion(imagenes.animacion_morir,
            this.ancho, this.alto, 2, 4, this.finAnimacionMorir.bind(this) );


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

        this.vx = 10; // velocidadX
        this.vy = 0; // velocidadY
        this.bloques = [];
        this.suelos = [];

        this.estado = estados.abajo;

    }


    actualizar(){

        this.animacion.actualizar();

        if (this.indice == 4)
            this.indice = 0;

        if ( this.estado == estados.muriendo) {
            this.animacion = this.morir;
            this.vx = 0;
        }else
            this.vx = 10;







    }

    saltar() {
        if ( this.isNotDead() && (this.isInTheFloor() || this.isInABlock())) {

            if(this.estado == estados.abajo)
                this.vy = -23;
            else
                this.vy = 23;

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

    isInABlock(){
        for(var i=0;i<this.suelos.length;i++){
            if(this.colisiona(this.suelos[i]))
                return true;
        }
        return false;

    }


    senBlocks(bloques,suelos){
        this.bloques = bloques;
        this.suelos = suelos;
    }


    finAnimacionSaltar(){
        this.animacion = this.orientaciones[this.indice++];
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }


    golpeado (){
        if ( this.isNotDead() ){
            this.estado = estados.muriendo;
        }
    }

    isNotDead(){
         return this.estado!=estados.muriendo && this.estado!=estados.muerto ? true:false;
    }

    isDead(){
        return this.estado== estados.muerto ? true:false;
    }

}