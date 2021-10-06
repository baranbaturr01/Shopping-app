import {Request, Response, NextFunction} from 'express'

import logging from "../config/logging";
import {Order} from "../models/Order";
import {Customer} from "../models/Customer";

const NAMESPACE = 'Order Controller'
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'order')

    // @ts-ignore
    const customer = req._user

    const customerModel = new Customer()
    customerModel.id = customer.id

    const result = await customerModel.getOrders()

    return res.json(result)
}

const addOrders = async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const customer = req._user
    const products = req.body.products

    if (!Array.isArray(products)) {
        throw new Error('Lutfen urun seciniz')
    }

    const checkData = products.filter(product => typeof product.id === "undefined" || typeof product.quantity === 'undefined')

    if (checkData.length > 0) {
        throw new Error('Lutfen id ve product bilgisi giriniz')
    }


    const order = new Order()
    order.customer_id = customer.id
    await order.createOrder()

    for (let i = 0; i < products.length; i++) {
        order.product_id = products[i].id
        order.count = products[i].quantity
        await order.addItem()
    }

    logging.info(NAMESPACE, 'order')

    return res.json({message: 'sipariş eklendi'})
}
export default {getOrders, addOrders}