"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var NAMESPACE = 'Order Controller';
var getOrders = function (req, res, next) {
    logging_1.default.info(NAMESPACE, 'order');
    return res.json({ message: 'Siparişler listelendi' });
};
var addOrders = function (req, res, next) {
    logging_1.default.info(NAMESPACE, 'order');
    return res.json({ message: 'sipariş eklendi' });
};
exports.default = { getOrders: getOrders, addOrders: addOrders };
//539 370 40 78
