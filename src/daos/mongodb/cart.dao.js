import { CartModel } from "./models/cart.model";

export default class cartDaoMongoDB {
    async getAll(){
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const response = await CartModel.findById(id).populate("products");
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj){
        try {
            const response = await CartModel.findByIdAndUpdate(id, obj, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async delete(id){
        try {
           const response = await CartModel.findByIdAndDelete(id);
           return response;
        } catch (error) {
            console.log(error);
        }
    }
}