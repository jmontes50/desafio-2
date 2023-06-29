import fs from "fs";

class CarritoManager {
  constructor() {
    this.carritos = [];
    this.autoincrementId = 1;
  }

  crearCarrito() {
    const carrito = {
      id: this.autoincrementId,
      products: []
    };
    this.carritos.push(carrito);
    this.autoincrementId++;
    this.guardarCarritosEnArchivo();
    return carrito.id;
  }

  agregarProducto(idCarrito, idProducto, cantidad) {
    const carrito = this.buscarCarrito(idCarrito);
    if (carrito) {
      const productoExistente = carrito.products.find(producto => producto.id === idProducto);
      if (productoExistente) {
        productoExistente.cantidad += cantidad;
      } else {
        carrito.products.push({ id: idProducto, cantidad });
      }
      this.guardarCarritosEnArchivo();
      return true;
    }
    return false;
  }

  buscarCarrito(idCarrito) {
    return this.carritos.find(carrito => carrito.id === idCarrito);
  }

  guardarCarritosEnArchivo() {
    fs.writeFileSync('carrito.json', JSON.stringify(this.carritos, null, 2));
  }

  cargarCarritosDesdeArchivo() {
    try {
      const data = fs.readFileSync('carrito.json');
      this.carritos = JSON.parse(data);
      this.autoincrementId = this.obtenerUltimoId() + 1;
    } catch (error) {
      // El archivo no existe o está vacío, no se hace nada
    }
  }

  obtenerUltimoId() {
    if (this.carritos.length === 0) {
      return 0;
    }
    const ids = this.carritos.map(carrito => carrito.id);
    return Math.max(...ids);
  }
}

export default CarritoManager;	