// CAPA DE PERSISTENCIA 1

import Cart from "../models/cart.js"

export default class CartMongo {
    constructor() { }

    async createModel(data) {
        let one = await Cart.create(data)
        return {
            message: 'Cart created.',
            response: { store_id: one._id }
        }
    };

    async readModel(user_id, state) {
        let all = await Cart.find({ user_id, state })
        if (all.length > 0) {
            return {
                message: 'Carts found.',
                response: { carts: all }
            }
        } else {
            return null;
        }
    };
};