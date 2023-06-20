import express from "express"
import morgan from "morgan";
import { ProductManager } from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const productManager = new ProductManager("./productos.json");

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

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});