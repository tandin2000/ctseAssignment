const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        min: 2
    },
    productList:[{
        productId:{
            type: String,
            required: true,
            min: 2
        },
        quantity:{
            type: Number,
            required: true,
            min: 1
        }
    }]
});

module.exports = mongoose.model('carts', CartSchema);