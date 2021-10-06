import {Request, Response, NextFunction} from 'express'
import logging from "../config/logging";

import bcryptjs from "bcryptjs";
import {Users} from "../models/Users";

const isEmpty = require('is-empty')

const NAMESPACE = 'Users'
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Toekn validated,user Authorized')

    return res.status(200).json({message: 'Authorized'})

}
const register = async (req: Request, res: Response, next: NextFunction) => {

    const {username, password} = req.body

    if (isEmpty(username)) {
        return res.status(400).json({message: 'username bos gecilemez'})
    }
    if (isEmpty(password)) {
        return res.status(400).json({message: 'password bos gecilemez'})
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = new Users()

    user.username = username
    user.password = hashedPassword

    const result = await user.register()

    if (!result) {
        return res.status(500).json({message: 'Kayit sirasinda bir hata meydana geldi'})
    }

    return res.json({success: true})

}
const login = async (req: Request, res: Response, next: NextFunction) => {

    const {username, password} = req.body

    if (isEmpty(username)) {
        return res.status(400).json({message: 'username bos gecilemez'})
    }
    if (isEmpty(password)) {
        return res.status(400).json({message: 'password bos gecilemez'})
    }
    const user = new Users()

    const token = await user.login(username, password)

    if (!token) {
        return res.status(404).json({message: 'username veya sifre hatali'})
    }
    return res.json({token: token})

}
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
}

export default {validateToken, register, login, getAllUsers}