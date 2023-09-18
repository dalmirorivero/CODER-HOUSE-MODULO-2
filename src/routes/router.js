import { Router } from 'express';
import jwt from 'jsonwebtoken';

export default class MyRouter {
    constructor() {
        this.router = Router()
        this.init()
    }
    getRouter() {
        return this.router
    }
    init() {}
    applyCallback (cbs){
        return cbs.map(cb => async(...params)=>{
            try {
                await cb.apply(this, params)
            } catch (error) {
                params[1].status(500).send(error)
            }
        })
    }
    responses = (req,res,next) => {
        res.sendSucces = payload => res.status(200).json(payload)
        res.sendSuccesCreate = payload = res.status(201).json(payload)
        res.sendNotFound = () => res.status(404).json({succes:false, response:'not found'})
        res.sendNoAuthenticatedError = error => res.status(401).json({status: "error", error})
        res.sendNoAuthorizatedError = error => res.status(403).json({status: "error", error})
        return next()
        
    }
    handlePolicies = policies => (req, res, next) => {
        if(policies.includes('PUBLIC')) {
     return next()
        } else {
     const authHeaders = req.headers.authorization
     if(!authHeaders) {
        return res.sendNoAuthenticatedError('Unauthenticated')
     } else {
        const tokenArray = authHeaders.split(" ")
        const token = tokenArray[1]
        const user = jwt.verify(token,process.env.SECRETKEY)
        const role = user.role
        if ((policies.includes('ADMIN') && role===1) || (policies.includes('PREM') && role===2)) {
     req.user = user
     return next()
        } else {
     return res.sendNoAuthorizatedError('Unauthorized')
        }
     }
        }
     }
     
    post(path, policies, ...cbs){
        this.router.post(path, this.responses, this.handlePolicies(policies), this.applyCallback(cbs))
    }
    get(path, policies, ...cbs) {
        this.router.get(path, this.responses,this.handlePolicies(policies), this.applyCallback(cbs))
    }
    put(path, policies, ...cbs){
        this.router.put(path,this.responses,this.handlePolicies(policies), this.applyCallback(cbs))
    }
    delete(path, policies, ...cbs){
        this.router.delete(path,this.responses,this.handlePolicies(policies), this.applyCallback(cbs))
    }
}