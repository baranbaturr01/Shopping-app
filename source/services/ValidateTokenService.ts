import Utils from '../Utils/JwtDecode'
import {Users} from "../models/Users";
import config from "../config/config";
import {Customer} from "../models/Customer";


const validateToken = async (token) => {
    const payload = await Utils.jwtDecode(token, {}) as any

    if (payload.token_type !== 'CUSTOMER') {
        throw new Error('Bu islem icin yetkiniz bulunmamaktadir')
    }
    const customer = new Customer()

    const findUser = await customer.findById(payload.customer_id)
    if (!findUser) {
        throw new Error('Kullanici bulunamadi')
    }

    const isVerify = await Utils.jwtVerify(token, config.server.token.secret, {})
    return findUser
}

export default validateToken