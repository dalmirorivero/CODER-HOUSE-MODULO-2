// CAPA DE SERVICIO 2

import UserMongo from "../dao/mongo/users.mongo.js"

export default class UserService {
    constructor() {this.model = new UserMongo()}

    registerService(data) {
        let response = this.model.registerModel(data)
        return response
    };

    loginService(user) {
        let response = this.model.loginModel(user)
        return response
    };

    logoutService() {
        let response = this.model.logoutModel()
        return response
    };

    readService() {
        let response = this.model.readUserModel()
        return response
    };

    readOneService(mail) {
        let response = this.model.readOneUserModel(mail)
        return response
    };

    readByIdService(id) {
        let response = this.model.readByIdModel(id)
        return response
    };

    updateService(mail, data) {
        let response = this.model.updateUserModel(mail, data)
        return response
    };

    deleteService(mail) {
        let response = this.model.destroyModel(mail)
        return response
    };
};