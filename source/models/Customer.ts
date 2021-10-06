import {connection} from "../config/postgresql";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";


export class Customer {

    id: number = 0;
    firstname: string = "";
    lastname: string = "";
    password: string = "";
    email: string = "";


    constructor(id = 0) {
        this.id = id
    }

    async create() {
        const check = await connection.query('select * from customers where email = $1 limit 1', [this.email])

        if (check.rows.length > 1) {
            throw new Error('Kayit basarisiz')
        }

        const result = await connection.query('insert into customers(firstname, lastname, password, email) values ($1, $2, $3, $4) RETURNING *', [
            this.firstname,
            this.lastname,
            this.password,
            this.email
        ])

        console.log('customer model', result.rows[0])
    }

    async login(email, password) {

        const result = await connection.query(`SELECT * FROM customers WHERE email = $1 limit 1`, [email])

        if (result.rows.length === 0) {
            return false
        }

        const customer = result.rows[0]

        const compare = await bcryptjs.compare(password, customer.password)

        if (!compare) {
            return false
        }
        return jwt.sign({customer_id: customer.id, token_type: 'CUSTOMER'}, config.server.token.secret)
    }

    async getCustomers() {
        return await connection.query('select * from customers')
    }

    async findById(id) {
        const customer = await connection.query(`SELECT id, email, firstname, lastname FROM customers WHERE id = '${id}'`)

        if (customer.rows.length === 0) {
            return false
        }
        return customer.rows[0]

    }

    async getOrders() {
        const result = await connection.query(`
select customers.firstname                        as firstname,
                                       customers.lastname                         as lastname,
                                       customers.email                            as email,
                                       products.title                             as product_title,
                                       products.list_price                        as list_price,
                                       products.sell_price                        as sell_price,
                                       orders.order_id                        as order_id,
                                       (select sum(b.count)
                                        from orders b
                                        where b.product_id = orders.product_id
                                          and b.customer_id = orders.customer_id and b.order_id = customer_orders.id) as quantity
from orders
         inner join customer_orders on customer_orders.id = orders.order_id
         inner join customers on customers.id = orders.customer_id
         inner join products on orders.product_id = products.id
where orders.customer_id = $1
`, [this.id])
        const orders = result.rows

        if (orders.length === 0) {
            return {}
        }

        let orderIds = orders.map(order => order.order_id)

        orderIds = new Set(orderIds)

        let ordersData = [] as any

        orderIds.forEach((id) => {
            const items = orders.filter(order => order.order_id === id)
            ordersData.push({
                order_Id: id,
                items: items.map(order => {
                    return {
                        product_title: order.product_title,
                        list_price: order.list_price,
                        sell_price: order.sell_price,
                        quantity: order.quantity
                    }
                })
            })
        })
        return {
            first_name: orders[0].firstname,
            last_name: orders[0].lastname,
            email: orders[0].email,
            items: ordersData
        }
    }

    async getOrderDetail(orderId) {
        const result = await connection.query(`
select customers.firstname                        as firstname,
                                       customers.lastname                         as lastname,
                                       customers.email                            as email,
                                       products.title                             as product_title,
                                       products.list_price                        as list_price,
                                       products.sell_price                        as sell_price,
                                       orders.order_id                        as order_id,
                                       (select sum(b.count)
                                        from orders b
                                        where b.product_id = orders.product_id
                                          and b.customer_id = orders.customer_id and b.order_id = customer_orders.id) as quantity
from orders
         inner join customer_orders on customer_orders.id = orders.order_id
         inner join customers on customers.id = orders.customer_id
         inner join products on orders.product_id = products.id
where orders.customer_id = $1 and orders.order_id=$2
`, [this.id, orderId])
        const orders = result.rows

        if (orders.length === 0) {
            return {}
        }

        let orderIds = orders.map(order => order.order_id)

        orderIds = new Set(orderIds)

        let ordersData = [] as any

        orderIds.forEach((id) => {
            const items = orders.filter(order => order.order_id === id)
            ordersData.push({
                order_Id: id,
                items: items.map(order => {
                    return {
                        product_title: order.product_title,
                        list_price: order.list_price,
                        sell_price: order.sell_price,
                        quantity: order.quantity
                    }
                })
            })
        })
        return {
            first_name: orders[0].firstname,
            last_name: orders[0].lastname,
            email: orders[0].email,
            items: ordersData
        }
    }
}