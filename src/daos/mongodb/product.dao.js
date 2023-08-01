import { ProductModel } from './models/product.model.js';

export default class productDaoMongoDB {
    async getAll({ page = 1, limit = 10, sort = "asc", query}){
        try {
            const filter = {};
            if(query){
                filter = {...query}
            }
            const response = await ProductModel.paginate(filter, {page, limit, sort: {price: sort},})
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj){
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async delete(id){
        try {
           const response = await ProductModel.findByIdAndDelete(id);
           return response;
        } catch (error) {
            console.log(error);
        }
    }
}