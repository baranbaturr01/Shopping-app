import express from 'express'
import customerController from '../controllers/customerContoller'
import productController from '../controllers/productController'
import userController from '../controllers/userController'
import CheckUserToken from '../middleware/checkToken'
import checkCustomerToken from '../middleware/checkCustomerToken'
import orderController from "../controllers/orderController";


const router = express.Router()

/*Login-Register*/
router.post('/admin/register', userController.register)
router.post('/admin/login', userController.login)


/*Customer*/

router.post('/register-customer', CheckUserToken, customerController.registerCustomer)
router.get('/get-customers', CheckUserToken, customerController.getCustomer)
router.post('/customer/login', customerController.customerLogin)
router.post('/order-detail', checkCustomerToken, customerController.getDetailOrder)


/*Product*/

router.post('/add-product', CheckUserToken, productController.addProduct)
router.get('/get-products', CheckUserToken, productController.getProducts)
router.post('/update-product', CheckUserToken, productController.updateProduct)

/*Order*/
router.post('/make-order', checkCustomerToken, orderController.addOrders)
router.get('/get-customer-orders', checkCustomerToken, orderController.getOrders)

export = router