class GameLayer extends Layer {

    constructor() {
        super();
        this.mensaje = new Boton(imagenes.mensaje_como_jugar, 480/2, 320/2);
        this.pausa = true;
        this.iniciar();
    }

    iniciar() {
        //reproducirMusica();
        this.espacio = new Espacio(1.5);

        this.scrollX = 0;
        this.suelos = [];
        this.bloques = [];
        this.pinchos = [];
        this.gravitys = [];

        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);


        this.cargarMapa("res/"+nivelActual+".txt");
        this.jugador.senBlocks(this.bloques,this.suelos);
    }

    actualizar (){

        if (this.pausa){
            return;
        }

        if(estadoJuego == estados.muerto) {
            this.iniciar();
            estadoJuego = estados.abajo;
        }

        for (var i=0; i < this.gravitys.length; i++) {
            this.gravitys[i].actualizar();
        }

        this.espacio.actualizar();
        this.fondo.vx = -5;
        this.fondo.actualizar();
        this.jugador.actualizar();

        for (var i=0; i < this.bloques.length; i++){
            if (this.jugador.colisionaLateral(this.bloques[i]))
                this.jugador.golpeado();

        }

        for (var i=0; i < this.pinchos.length; i++) {
            if (this.jugador.colisiona(this.pinchos[i]))
                this.iniciar();
        }

        for (var i=0; i < this.gravitys.length; i++) {
            if (this.jugador.colisiona(this.gravitys[i])){
                this.espacio.gravedad = -1;
                if(this.jugador.estado == estados.arriba)
                    this.jugador.estado = estados.abajo;
                else
                    this.jugador.estado = estados.arriba;

                this.gravitys.splice(i,1);
                this.espacio.eliminarCuerpoDinamico(this.gravitys[i]);
            }

        }




    }


    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }

        // limite derecha
        if ( this.jugador.x < this.anchoMapa - 480 * 0.3 ) {
            if (this.jugador.x - this.scrollX > 480 * 0.4) {
                this.scrollX = this.jugador.x - 480 * 0.4;
            }
        }
    }

    dibujar (){
        this.calcularScroll();
        this.fondo.dibujar();

        for (var i=0; i < this.suelos.length; i++){
            this.suelos[i].dibujar(this.scrollX);
        }

        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX);
        }

        for (var i=0; i < this.pinchos.length; i++){
            this.pinchos[i].dibujar(this.scrollX);
        }

        for (var i=0; i < this.gravitys.length; i++) {
            this.gravitys[i].dibujar(this.scrollX);
        }

        this.jugador.dibujar(this.scrollX);

        if ( this.pausa ) {
            this.mensaje.dibujar();
        }

    }



    procesarControles( ){

        if (controles.continuar){
            controles.continuar = false;
            this.pausa = false;
        }


        if ( controles.barspace > 0 ){
            this.jugador.saltar();
        }
    }


    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * 40;
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }


    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "1":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var suelo = new Bloque(imagenes.suelo, x,y);
                suelo.y = suelo.y - suelo.alto/2;
                // modificación para empezar a contar desde el suelo
                this.suelos.push(suelo);
                this.espacio.agregarCuerpoEstatico(suelo);
                break;
            case "B":
                var bloque = new Bloque(imagenes.bloque, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "T":
                var bloque = new Bloque(imagenes.triangulo, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.pinchos.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "P":
                var bloque = new Bloque(imagenes.pincho, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.pinchos.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "U":
                var bloque = new GravityIcon(imagenes.gravity_up, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.gravitys.push(bloque);
                this.espacio.agregarCuerpoDinamico(bloque);
                break;
            case "D":
                var bloque = new GravityIcon(imagenes.gravity_down, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.gravitys.push(bloque);
                this.espacio.agregarCuerpoDinamico(bloque);
                break;
        }
    }

}