import productDaoMongoDB from "../daos/mongodb/product.dao";
const productDao = new productDaoMongoDB();

export const getAll = async () => {
    try {
        const response = await productDao.getAll();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getById = async (id) => {
    try {
        const item = await productDao.getById(id);
        if(!item) return false;
        else return item;
    } catch (error) {
        console.log(error);
    }
}

export const create = async (obj) => {
    try {
       const newProd = await productDao.create(obj);
       if (!newProd) return false;
       else return newProd;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (id, obj) => {
    try {
        const item = await productDao.update(id, obj);
        return item;
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (id) => {
    try {
        const item = await productDao.delete(id);
        return item;
    } catch (error) {
        console.log(error);
    }
}