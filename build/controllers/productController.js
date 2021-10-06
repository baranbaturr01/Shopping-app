"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var NAMESPACE = 'Product Controller';
var getProducts = function (req, res, next) {
    logging_1.default.info(NAMESPACE, 'product');
    return res.json({ message: 'Product' });
};
var addProducts = function (req, res, next) {
    logging_1.default.info(NAMESPACE, 'product');
    return res.json({ message: 'add products' });
};
var updateProducts = function (req, res, next) {
    logging_1.default.info(NAMESPACE, 'product');
    return res.json({ message: 'update products' });
};
exports.default = { getProducts: getProducts, addProducts: addProducts, updateProducts: updateProducts };
