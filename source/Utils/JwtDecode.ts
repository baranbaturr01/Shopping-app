import jsonwebtoken from 'jsonwebtoken'

const jwtDecode = (token: string, options: object) => {

    return new Promise(((resolve, reject) => {

        try {
            const decoded = jsonwebtoken.decode(token, options);
            resolve(decoded)

        } catch (error) {
            reject(error)
        }
    }))
}
const jwtVerify = async (token: string, key: string, options: object) => {
    return new Promise(((resolve, reject) => {
        jsonwebtoken.verify(token, key, options, (err, decoded) => {
            if (err) {

                reject(err)
            } else {
                resolve(decoded)
            }
        })
    }))
}

export default {jwtDecode, jwtVerify}