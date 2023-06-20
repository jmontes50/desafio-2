import { ProductManager } from "./ProductManager.js";

const productManager = new ProductManager("./productos.json");

const testProductManger = async () => {
  try {
    const products = await productManager.getProducts();
    console.log({ products });

    const product1 = {
      title: "Producto prueba",
      description: "Este es un producto de prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc1234",
      stock: 25,
    };

    const product2 = {
      title: "Producto prueba 2",
      description: "Este es un producto de prueba 2",
      price: 400,
      thumbnail: "Sin imagen",
      code: "abc1235",
      stock: 5,
    };

    await productManager.addProduct(product1);
    await productManager.addProduct(product2);

    console.log("agregados: ", await productManager.getProducts());
/*
    const findProduct = await productManager.getProductById(2);
    console.log({ findProduct });

    const product1_1 = {
      id: 1,
      title: "Producto prueba actualizado",
      description: "Este es un producto actualizado",
      price: 250,
      thumbnail: "Sin imagen",
      code: "abc1234",
      stock: 25,
    };

    const updated = await productManager.updateProduct(product1_1);
    console.log({ updated });

    await productManager.deleteProduct(2);

    const deleted = await productManager.getProducts();
    console.log({ deleted });
    */
  } catch (error) {
    console.log("ERROR: ", error);
  }
  
};

testProductManger();
