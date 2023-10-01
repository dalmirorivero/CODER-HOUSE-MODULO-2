// CAPA DE SERVICIO 2

import CartMongo from "../dao/mongo/carts.mongo.js"

export default class CartService {
    constructor() {this.model = new CartMongo()}

    createService(data) {
        let response = this.model.createModel(data)
        return response
    };

    readService(user_id, state) {
        let response = this.model.readModel(user_id, state)
        return response
    };
};