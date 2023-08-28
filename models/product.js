const mongoose = require('mongoose');

//creation of our product schema (how we format it)
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});

const Product = mongoose.model('Product', productSchema);

//allows us to use this model in other modules
module.exports = Product;