const express = require('express');
const router = express.Router();
const Controller = require('../controllers/cart.controller');

module.exports = function () {
    router.post('/:user_id', Controller.add);
    router.get('/:user_id', Controller.get);
    router.put('/:user_id/product/:product_id', Controller.update);
    router.delete('/:user_id/product/:product_id', Controller.deleteOne);
    router.delete('/:user_id/all', Controller.deleteAll);
    return router;
}