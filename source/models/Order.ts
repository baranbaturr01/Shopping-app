import {connection} from "../config/postgresql";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";

export class Order {
    id: number|null = null;
    product_id :number|null = null;
    customer_id :number|null = null;
    count :number|null = null;
    orderId :number|null = null

    constructor(id = 0) {
        this.id = id
    }

    async addItem() {
        const check = await connection.query('insert into orders (product_id, customer_id, count, order_id) values ($1, $2, $3, $4)', [
            this.product_id,
            this.customer_id,
            this.count,
            this.orderId
        ])

        if (check.rows.length > 1) {
            throw new Error('Kayit basarisiz')
        }

        return true
    }

    async findByCustomerId() {
        const check = await connection.query('insert into orders (product_id, customer_id, count) values ($1, $2, $3)', [
            this.product_id,
            this.customer_id,
            this.count
        ])

        if (check.rows.length > 1) {
            throw new Error('Kayit basarisiz')
        }

    }

    async createOrder() {
        const result = await connection.query('insert into customer_orders (customer_id) values ($1) RETURNING *', [this.customer_id])
        this.orderId = result.rows[0].id
    }

}