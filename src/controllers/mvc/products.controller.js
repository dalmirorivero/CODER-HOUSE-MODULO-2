// CAPA CONTROLADORA 3

import ProductService from "../../services/products.service.js";

export default class ProductController {
    constructor() {this.service = new ProductService()}

    createController(data) {
        let response = this.service.createService(data)
        return response
    };
    
    readController() {
        let response = this.service.readService()
        return response
    };
    
    readOneController(id) {
        let response = this.service.readOneService(id)
        return response
    };
    
    updateController(id, data) {
        let response = this.service.updateService(id, data)
        return response
    };
    
    deleteController(id) {
        let response = this.service.deleteService(id)
        return response
    };
};