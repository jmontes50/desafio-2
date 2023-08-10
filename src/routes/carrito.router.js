import { Router } from "express";

const router = Router();

import { getAll, getById, create, update, remove } from "../services/cart.services.js";

router.post("/", async (req, res) => {
    try {
        const products = req.body;
        const newCarrito = await create(products);
        res.status(200).json(newCarrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const carrito = await getById(cid);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await create({cid, pid});
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await delete({cid, pid});
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;