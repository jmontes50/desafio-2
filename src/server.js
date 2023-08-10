import express from "express"
import morgan from "morgan";
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Server } from 'socket.io';
import { __dirname } from "./paths.js";
import { connectionString } from './daos/mongodb/connection.js'
import productRouter from "./routes/product.router.js";
import carritoRouter from "./routes/carrito.router.js";
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import { ProductManager } from "./daos/managers/ProductManager.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getAll, getById, create, update } from "./services/message.services.js";

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

const app = express();
const productManager = new ProductManager("./productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(morgan('dev'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session(mongoStoreOptions));

const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

const socketServer = new Server(httpServer);

app.use('/products', productRouter);
app.use('/carrito', carritoRouter);

app.use('/users', userRouter);
app.use('/', viewsRouter);

app.get('/realtime', async (req, res) => {
    console.log("in realtime");
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.log("realtime error: ", { error });
    }
});

app.get('/chat', async (req, res) => {
    res.render('chat');
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
        console.log({ id });
        await productManager.deleteProduct(parseInt(id));
        const products = await productManager.getProducts();
        socketServer.emit("delete-product", products);
        res.status(200)
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: error.message });
    }
});

socketServer.on("connection", async (socket) => {
    console.log("sockets workssssss", socket.id);

    socketServer.emit('messages', await getAll());

    socket.on('disconnect', () => {
        console.log('¡User disconnect!', socket.id);
    })

    socket.on('newUser', (user) => {
        console.log(`>${user} inició sesión`);
    })

    socket.on('chat:message', async (obj) => {
        await create(obj);
        socketServer.emit('messages', await getAll());
    })

    socket.emit('msg', 'bienvenido al chat');

    socket.on('newUser', (user) => {
        socket.broadcast.emit('newUser', user);
    })

    socket.on('chat:typing', (user) => {
        socket.broadcast.emit('chat:typing', user)
    })
});

