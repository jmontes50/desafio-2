import express from "express"
import morgan from "morgan";
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from "./paths.js";
import productRouter from "./routes/product.router.js";
import carritoRouter from "./routes/carrito.router.js";
import { ProductManager } from "./managers/ProductManager.js";

const app = express();
const productManager = new ProductManager("./productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

const socketServer = new Server(httpServer);

app.use('/products', productRouter);
app.use('/carrito', carritoRouter);

app.get('/realtime', async (req, res) => {
    console.log("in realtime");
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.log("realtime error: ",{error});
    }
});

app.post('/createproduct', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        socketServer.emit("new-product", products);
        res.status(200)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/deleteproduct/:id', async (req, res) => {
    console.log("in deleteproduct");
    try {
        const { id } = req.params;
        console.log({id});
        await productManager.deleteProduct(parseInt(id));
        const products = await productManager.getProducts();
        socketServer.emit("delete-product", products);
        res.status(200)
    } catch (error) {
        console.log({error});
        res.status(500).json({ error: error.message });
    }
});

socketServer.on("connection", (socket) => {
    console.log("sockets workssssss", socket.id);
  });

