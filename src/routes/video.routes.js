const express = require('express');
const router = express.Router();
const controller = require('../controllers/video.controller');

module.exports = function () {
    router.post('/', controller.create);
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.updateById);
    router.delete('/:id', controller.deleteById);
    return router;
}