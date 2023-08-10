import userDaoMongoDB from "../daos/mongodb/user.dao.js";
const userDao = new userDaoMongoDB();

export const register = async (user) => {
    try {
        const response = await userDao.registerUser(user);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (user) => {
    try {
        const response = await userDao.loginUser(user);
        return response;
    } catch (error) {
        console.log(error);
    }
};