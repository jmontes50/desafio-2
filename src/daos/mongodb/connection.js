import mongoose from 'mongoose';

export const connectionString = 'mongodb+srv://admin:admin@cluster0.exbpgkw.mongodb.net/?retryWrites=true&w=majority';

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB!');
} catch (error) {
    console.log({ error });
}