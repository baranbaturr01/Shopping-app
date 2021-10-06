import {Request, Response, NextFunction} from 'express'
import validateToken from '../services/ValidateTokenService'

const isEmpty = require('is-empty')

const checkToken = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('X-Token')

    if (isEmpty(token)) {
        return res.status(400).json({message: 'Token bos gecilemez'})
    }
    const isValidate = await validateToken(token)
    if (!isValidate) {
        return res.json('hata')
    }

    // @ts-ignore
    req._user = isValidate
    return next()
}

export default checkToken