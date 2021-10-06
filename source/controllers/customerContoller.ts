import {Request, Response, NextFunction} from 'express'
import logging from "../config/logging";
import {Customer} from "../models/Customer";
import isEmpty from 'is-empty'
import emailValidator from 'email-validator'
import bcryptjs from "bcryptjs";

const NAMESPACE = 'Customer'

const registerCustomer = async (req: Request, res: Response) => {

    logging.info(NAMESPACE, 'add customer.');

    const firstName = req.body.first_name
    const lastName = req.body.last_name
    const email = req.body.email
    const password = req.body.password

    if (firstName.length === 0) {
        return res.status(400).json({
            message: 'first name boş geçilemez'
        })
    }

    if (lastName.length === 0) {
        return res.status(400).json({
            message: 'lastName  boş geçilemez'
        })
    }
    if (email.length === 0) {
        return res.status(400).json({
            message: 'email boş geçilemez'
        })
    }
    if (!emailValidator.validate(email)) {
        return res.status(400).json({
            message: 'Gecerli bir email giriniz'
        })
    }
    if (password.length === 0) {
        return res.status(400).json({
            message: 'password boş geçilemez'
        })
    }
    const customer = new Customer()

    customer.firstname = firstName
    customer.lastname = lastName
    customer.password = await bcryptjs.hash(password, 10)
    customer.email = email

    try {
        await customer.create()
    } catch (e) {
        return res.json('Bu email daha onceden kayit edilmis')
    }

    return res.json({success: true})
}

const getCustomer = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, 'Get Customer.');


    const customer = new Customer()

    const result = await customer.getCustomers()

    if (!result) {
        throw new Error('Kayitli musteri yok ')
    }

    const customers = [] as any

    result.rows.forEach(customer => {
        customers.push({
            id: customer.id,
            email: customer.email,
            first_name: customer.firstname,
            last_name: customer.lastname
        })
    })

    return res.json({customers: customers})

}

const customerLogin = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Login Customer');

    const email = req.body.email
    const password = req.body.password

    if (isEmpty(email)) {
        throw new Error('Email bos gecilemez')
    }

    if (!emailValidator.validate(email)) {
        throw new Error('Gecerli bir email giriniz')
    }

    if (isEmpty(password)) {
        throw new Error('Password bos gecilemez')
    }

    const customer = new Customer()

    const token = await customer.login(email, password)

    if (!token) {
        throw new Error('Kayitli musteri yok ')
    }


    return res.json({token: token})

}
const getDetailOrder = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Login Customer');

    const orderId = req.body.order_id

    if (isEmpty(orderId)) {
        return res.json({message: 'order_id boş geçilemez'})

    }

    const customer = new Customer()
    // @ts-ignore
    customer.id = req._user.id
    const orderDetail = await customer.getOrderDetail(orderId)

    return res.json({order_detail: orderDetail})
}

export default {registerCustomer, getCustomer, customerLogin, getDetailOrder}