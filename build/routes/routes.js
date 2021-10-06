"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var customerContoller_1 = __importDefault(require("../controllers/customerContoller"));
var productController_1 = __importDefault(require("../controllers/productController"));
var router = express_1.default.Router();

/*Customer*/
router.get('/get-customers', customerContoller_1.default.getCustomer);
router.get('/get-product', productController_1.default.getProducts);

/*Login-Register*/


module.exports = router;
