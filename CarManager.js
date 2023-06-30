import fs from "fs";

class CarritoManager {
  constructor() {
    this.carritos = [];
    this.autoincrementId = 1;
  }

  async crearCarrito(products = []) {
    const carrito = {
      id: this.autoincrementId,
      products: products
    };
    this.carritos.push(carrito);
    this.autoincrementId++;
    await this.saveCarritoInFile();
    return carrito;
  }

  async addProductToCarrito(cid, pid, quantity = 1) {
    const carrito = await this.getCarritoById(cid);
    if (carrito) {
      pid = parseInt(pid);
      const productoExistente = carrito.products.find(producto => producto.id === pid);
      console.log({ productoExistente });
      if (productoExistente) {
        productoExistente.quantity += quantity;
      } else {
        carrito.products.push({ id: pid, quantity });
      }
      await this.updateCarrito(cid, carrito);
      console.log({ carrito: JSON.stringify(carrito) });
      return carrito;
    }
    return 'Error: carrito no encontrado';
  }

  async getCarritos() {
    try {
      if (fs.existsSync('carrito.json')) {
        const data = await fs.promises.readFile('carrito.json', "utf-8");   
        const result = JSON.parse(data);
        return result;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async getCarritoById(id) {
    try {
      const carritos = await this.getCarritos();
      id = parseInt(id);
      return carritos.find((product) => product.id === id);
    } catch (error) {
      throw error;
    }
  }

  async saveCarritoInFile() {
    
    fs.writeFileSync('carrito.json', JSON.stringify(this.carritos, null, 2));
  }

  async updateCarrito(id, car){
    const carritos = await this.getCarritos();
    const index = carritos.findIndex((carrito) => carrito.id === parseInt(id));
    if (index !== -1) {
      carritos.splice(index, 1, car);
      fs.writeFileSync('carrito.json', JSON.stringify(carritos, null, 2));
      console.log("actualizando", JSON.stringify(carritos));
      return true
    }
    return false
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