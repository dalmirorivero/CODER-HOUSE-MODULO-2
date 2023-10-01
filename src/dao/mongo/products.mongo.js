// CAPA DE PERSISTENCIA 1

import Product from "../models/product.js";

export default class ProductMongo {
    constructor() { }

    async createModel(data) {
        let one = await Product.create(data)
        return {
            message: 'Product created.',
            response: { product_id: one._id }
        }
    };

    async readModel() {
        let all = await Product.find()
        if (all.length > 0) {
            return {
                message: 'Products found.',
                response: { products: all }
            }
        } else {
            return null;
        }
    };

    async readOneModel(id) {
        let one = await Product.findById(id)
        if (one) {
            return {
                message: 'Product found.',
                response: one
            }
        } else {
            return null;
        }
    };

    async updateModel(id, data) {
        let one = await Product.findByIdAndUpdate(id, data, { new: true })
        if (one) {
            return {
                message: 'Product updated.',
                response: one
            }
        } else {
            return null;
        }
    };

    async destroyModel(id) {
        let one = await Product.findByIdAndDelete(id)
        if (one) {
            return {
                message: 'Product deleted.',
                response: one
            }
        } else {
            return null;
        }
    };
};