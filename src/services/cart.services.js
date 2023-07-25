import cartDaoMongoDB from "../daos/mongodb/cart.dao";
const cartDao = new cartDaoMongoDB();

export const getAll = async () => {
    try {
        const response = await cartDao.getAll();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getById = async (id) => {
    try {
        const item = await cartDao.getById(id);
        if(!item) return false;
        else return item;
    } catch (error) {
        console.log(error);
    }
}

export const create = async (obj) => {
    try {
       const newProd = await cartDao.create(obj);
       if (!newProd) return false;
       else return newProd;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (id, obj) => {
    try {
        const item = await cartDao.update(id, obj);
        return item;
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (id) => {
    try {
        const item = await cartDao.delete(id);
        return item;
    } catch (error) {
        console.log(error);
    }
}