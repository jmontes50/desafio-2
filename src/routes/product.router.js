import { Router } from "express";
// import { ProductManager } from "../daos/managers/ProductManager.js";
import { getAll, getById, create, update, remove } from "../services/product.services";

const router = Router();
// const productManager = new ProductManager("./productos.json");

router.get("/", async (req, res) => {
    try {
        const { page, limit, sort, query } = req.query;
        const response = await getAll({limit, sort, page, query});
        const next = response.hasNextPage ? `http://localhost:8080/products/all?page=${response.nextPage}` : null;
    const prev = response.hasPrevPage ? `http://localhost:8080/products/all?page=${response.prevPage}` : null;
    res.json({
      info: {
        count: response.totalDocs,
        pages: response.totalPages,
        next,
        prev
      },
      results: response.docs
    });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await 
        getById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await 
        create(product);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        const updatedProduct = await 
        update({ id:parseInt(id), ...product });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await remove(parseInt(id));
        res.status(200).json({ message: `Product with ${id} deleted` });
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});



export default router;