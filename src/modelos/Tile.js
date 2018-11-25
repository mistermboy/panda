class Tile extends Modelo {

    constructor(rutaImagen, x, y, velocidadRefresco, framesTotales) {
        super(rutaImagen, x, y)

        this.animacion = new Animacion(rutaImagen,
            this.ancho, this.alto,  velocidadRefresco, framesTotales, null );

    }

    actualizar () {
        this.animacion.actualizar();
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }



}
