import fs from "fs";

export class ProductManager {
  path;
  constructor(path) {
    this.path = path;
  }

  async #findBiggerId(products) {
    console.log({ products });
    try {
      if (fs.existsSync(this.path) && products.length > 0) {
        const ids = products.map((product) => product.id);
        return Math.max(...ids);
      }
      return 0;
    } catch (error) {
      throw error;
    }
  }

  #productExists(products, code) {
    return products.find((product) => product.code === code);
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");    
        console.log({data});
        const result = limit ? JSON.parse(data).slice(0, limit) : JSON.parse(data);
        return result;
      } else {
        // await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Faltan datos");
    }
    try {
      const products = await this.getProducts();

      if (this.#productExists(products, code)) {
        throw new Error("El producto ya existe");
      }

      const id = (await this.#findBiggerId(products)) + 1;
      const newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      id = parseInt(id);
      return products.find((product) => product.id === id);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct({
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) {
    if (!id) {
      throw new Error("no hay id");
    }
    try {
      const products = await this.getProducts();
      const product = await this.getProductById(id);

      if (!product) {
        throw new Error("El producto a actualizar no existe");
      }

      const updatedProduct = {
        id,
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
        thumbnail: thumbnail || product.thumbnail,
        code: code || product.code,
        stock: stock || product.stock,
      };

      console.log({ updatedProduct });

      const updatedProducts = products.map((product) =>
        product.id === id ? updatedProduct : product
      );

      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));

      // return await this.getProducts()
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    if (!id) {
      throw new Error("no hay id");
    }
    try {
      const products = await this.getProducts();
      const product = this.getProductById(id, products);
      if (!product) {
        throw new Error("El producto a eliminar no existe");
      }
      const updatedProducts = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
      return await this.getProducts()
    } catch (error) {
      throw error;
    }
  }
}
