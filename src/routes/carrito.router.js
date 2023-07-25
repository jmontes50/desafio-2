import { Router } from "express";
import { CarritoManager } from "../daos/managers/CarManager.js";

const router = Router();
const carritoManager = new CarritoManager();

router.post("/", async (req, res) => {
    try {
        const products = req.body;
        const newCarrito = carritoManager.crearCarrito(products);
        console.log({newCarrito});
        res.status(200).json(newCarrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const carrito = await carritoManager.getCarritoById(cid);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await carritoManager.addProductToCarrito(cid, pid);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;