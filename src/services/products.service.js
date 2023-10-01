// CAPA DE SERVICIO 2

import ProductMongo from "../dao/mongo/products.mongo.js";

export default class ProductService {
    constructor() {this.model = new ProductMongo()}

    createService(data) {
        let response = this.model.createModel(data)
        return response
    };

    readService() {
        let response = this.model.readModel()
        return response
    };

    readOneService(id) {
        let response = this.model.readOneModel(id)
        return response
    };

    updateService(id, data) {
        let response = this.model.updateModel(id, data)
        return response
    };

    deleteService(id) {
        let response = this.model.destroyModel(id)
        return response
    };
};