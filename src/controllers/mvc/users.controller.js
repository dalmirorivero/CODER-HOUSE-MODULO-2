// CAPA CONTROLADORA 3

import UserService from "../../services/users.service.js";

export default class UserController {
    constructor() {this.service = new UserService()}

    registerController(data) {
        let response = this.service.registerService(data)
        return response
    };

    loginController(user) {
        let response = this.service.loginService(user)
        return response
    };

    logoutController() {
        let response = this.service.logoutService()
            return response
    };

    readController() {
        let response = this.service.readService()
        return response
    };

    readOneController(mail) {
        let response = this.service.readOneService(mail)
        return response
    };

    readByIdController(id) {
        let response = this.service.readByIdService(id)
        return response
    };

    updateController(mail, data) {
        let response = this.service.updateService(mail, data)
        return response
    };

    deleteController(mail) {
        let response = this.service.deleteService(mail)
        return response
    };
};