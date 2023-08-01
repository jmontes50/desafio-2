import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema({
    name: { type: Array, default: [] },
});

cartSchema.pre('find', function(){
    this.populate('products')
  });
  
cartSchema.plugin(mongoosePaginate);

export const CartModel = mongoose.model('carts', cartSchema);