import messageDaoMongoDB from '../daos/mongodb/message.dao.js';
const messageDao = new messageDaoMongoDB();

export const getAll = async () => {
    try {
        const response = await messageDao.getAll();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getById = async (id) => {
    try {
        const item = await messageDao.getById(id);
        if(!item) return false;
        else return item;
    } catch (error) {
        console.log(error);
    }
}

export const create = async (obj) => {
    try {
       const newProd = await messageDao.create(obj);
       if (!newProd) return false;
       else return newProd;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (id, obj) => {
    try {
        const item = await messageDao.update(id, obj);
        return item;
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (id) => {
    try {
        const item = await messageDao.delete(id);
        return item;
    } catch (error) {
        console.log(error);
    }
}