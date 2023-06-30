import express from "express"
import morgan from "morgan";
import { ProductManager } from "./ProductManager.js";
import CarritoManager from "./CarManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const productManager = new ProductManager("./productos.json");
const carritoManager = new CarritoManager();

app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});

app.post("/products", async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        const updatedProduct = await productManager.updateProduct({ id:parseInt(id), ...product });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await productManager.deleteProduct(parseInt(id));
        res.status(200).json({ message: `Product with ${id} deleted` });
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});

app.post("/carrito", async (req, res) => {
    try {
        const products = req.body;
        const newCarrito = carritoManager.crearCarrito(products);
        console.log({newCarrito});
        res.status(200).json(newCarrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get("/carrito/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const carrito = await carritoManager.getCarritoById(cid);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/carrito/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await carritoManager.addProductToCarrito(cid, pid);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});