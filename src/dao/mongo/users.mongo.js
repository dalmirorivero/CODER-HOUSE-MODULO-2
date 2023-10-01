// CAPA DE PERSISTENCIA 1

import User from '../models/user.js'

export default class AuthMongo {
    constructor() { }

    async registerModel(data) {
        let one = await User.create(data)
        return {
            message: 'User created.',
            response: { user_id: one._id }
        }
    };

    async loginModel(user) {
        return {
            message: 'User logged in.',
            response: { user }
        }
    };

    async logoutModel() {
        return {
            message: 'User logged out.',
            response: null
        }
    };

    async readUserModel() {
        let all = await User.find({}, "-password")
        if (all.length > 0) {
            return {
                message: 'Users found.',
                response: { users: all }
            }
        } else {
            return null;
        }
    };

    async readOneUserModel(mail) {
        let one = await User.findById({ mail })
        if (one) {
            return {
                message: 'User found.',
                response: one
            }
        } else {
            return null;
        }
    };

    async readByIdModel(id) {
        let one = await User.findById(id)
        if (one) {
            return {
                message: 'User found.',
                response: one
            }
        } else {
            return null;
        }
    };

    async updateUserModel(mail, data) {
        let one = await User.findOneAndUpdate({ mail }, data, { new: true })
        if (one) {
            return {
                message: 'User updated.',
                response: one
            }
        } else {
            return null;
        }
    };

    async destroyUserModel(mail) {
        let one = await User.findOneAndDelete({ mail })
        if (one) {
            return {
                message: 'User deleted.',
                response: one
            }
        } else {
            return null;
        }
    };
};