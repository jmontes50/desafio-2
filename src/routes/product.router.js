import { Router } from "express";
import { ProductManager } from "../daos/managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./productos.json");

router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.get('/realtime', async (req, res) => {
//     console.log("in realtime");
//     try {
//         const products = await productManager.getProducts();
//         res.render('realTimeProducts', { products });
//     } catch (error) {
//         console.log("realtime error: ",{error});
//     }
// });

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await productManager.deleteProduct(parseInt(id));
        res.status(200).json({ message: `Product with ${id} deleted` });
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});



export default router;