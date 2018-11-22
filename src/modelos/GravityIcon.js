class GravityIcon extends Modelo {

    constructor(rutaImagen, x, y) {
        super(rutaImagen, x, y)

        this.animacion = new Animacion(rutaImagen,
            this.ancho, this.alto, 2, 3, null );

    }

    actualizar () {
        this.animacion.actualizar();
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }



}
