import { Schema, model } from 'mongoose';

const collection = 'carts';

const schema = new Schema({
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'Products'},
        quantity: {type: Number}
    }]
    ,
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

const Cart = model(collection, schema);

export default Cart;