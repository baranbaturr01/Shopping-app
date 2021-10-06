import {connection} from "../config/postgresql";


export class Product {

    id: number = 0;
    title: string = "";
    list_price: number | null = null;
    sell_price: number = 0;
    description: string = "";


    constructor(id = 0) {
        this.id = id
    }

    async create() {
        const result = await connection.query('insert into products(title, list_price, sell_price, description) values ($1, $2, $3, $4) RETURNING *', [
            this.title,
            this.list_price,
            this.sell_price,
            this.description
        ])

        console.log('Product Model', result.rows[0])
        return true
    }

    async getProducts() {
        return await connection.query('select * from products')
    }

    async update() {
        if (this.id === null ){
            throw new Error('Urun bulunamadi')
        }
        const result = await this._updateQueryBuilder()

        if (result.rows.length === 0) {
            return false
        }

        console.log('Product Model', result.rows[0])
        return true
    }

    async _updateQueryBuilder() {
        let variables = [] as any
        let sql = 'update products set '
        if (this.list_price) {
            sql = sql + ' list_price = $' + variables.length + 1
            variables.push(this.list_price)
        }
        if (this.sell_price) {
            const isComma = sql.slice(-1) == ' ' ? '' : ', '
            sql = sql + isComma
            sql = sql + ' sell_price = $' + variables.length + 1
            variables.push(this.sell_price)
        }
        if (this.title) {
            const isComma = sql.slice(-1) == ' ' ? '' : ', '
            sql = sql + isComma
            sql = sql + ' title = $' + variables.length + 1
            variables.push(this.title)
        }
        if (this.description) {
            const isComma = sql.slice(-1) == ' ' ? '' : ', '
            sql = sql + isComma
            sql = sql + ' description = $' + variables.length + 1
            variables.push(this.description)
        }

        sql = sql + ` where id = $${variables.length + 1} RETURNING * `
        variables.push(this.id)

        console.log('sql', sql)
        return await connection.query(sql, variables)
    }
}