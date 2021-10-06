import {Request, Response, NextFunction} from 'express'
import logging from "../config/logging";
import {Product} from "../models/Product";

const isEmpty = require('is-empty')

const NAMESPACE = 'Product Controller'
const addProduct = async (req: Request, res: Response, next: NextFunction) => {

    const title = req.body.title
    const sellPrice = req.body.sell_price
    const listPrice = req.body.list_price
    const description = req.body.description


    if (isEmpty(title)) {
        logging.warn(NAMESPACE, 'product title')
        return res.status(400).json({message: 'title bos gecilemez'})
    }

    if (isEmpty(sellPrice)) {
        logging.warn(NAMESPACE, 'product sell_price')

        return res.status(400).json({message: 'sell_price bos gecilemez'})
    }

    if (isEmpty(listPrice)) {
        logging.warn(NAMESPACE, 'product list_price')
        return res.status(400).json({message: 'list_price bos gecilemez'})
    }

    if (isEmpty(description)) {
        logging.warn(NAMESPACE, 'product description')
        return res.status(400).json({message: 'description bos gecilemez'})
    }

    const product = new Product()

    product.title = title
    product.list_price = listPrice
    product.sell_price = sellPrice
    product.description = description

    const result = await product.create()

    if (!result) {
        logging.error(NAMESPACE, 'product added')
        return res.status(400).json({message: 'Kayit sirasinda bir hata meydana geldi'})
    }

    logging.info(NAMESPACE, 'Add Product')

    return res.json({success: true})

}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get Products')

    const product = new Product()

    const result = await product.getProducts()

    const products = [] as any

    result.rows.forEach(product => {
        products.push({
            id: product.id,
            title: product.title,
            sell_price: product.sell_price,
            list_price: product.list_price
        })
    })
    return res.json({products: products})
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'product')

    const productId = req.body.product_id
    const title = req.body.title
    const sell_price = req.body.sell_price
    const list_price = req.body.list_price
    const description = req.body.description

    if (isEmpty(productId)) {
        throw new Error('Gecerli bir product_id giriniz')
    }

    const product = new Product()
    product.id = productId

    if (!isEmpty(title)) {
        product.title = title
    }
    if (!isEmpty(sell_price)) {
        product.sell_price = sell_price
    }
    if (!isEmpty(list_price)) {
        product.list_price = list_price
    }
    if (!isEmpty(description)) {
        product.description = description
    }

    let result
    try {
        result = await product.update()
    }catch (e) {
    }

    if (!result) {
        logging.error(NAMESPACE, 'product update')
        return res.status(400).json({message: 'Gubcelleme sirasinda bir hata meydana geldi'})
    }

    return res.json({message: 'update products'})
}

export default {addProduct, getProducts, updateProduct}