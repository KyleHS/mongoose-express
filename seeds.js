const Product = require('./models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open")
    })
    .catch(err => {
        console.log("failed to open")
        console.log(err)
    })

//seed database separate from web application

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 2.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//     console.log(p)
//     })
//     .catch(e => {
//     console.log(e)
//     })

const seedProducts = [
    {
        name: 'Ruby Grapefruit',
        price: 2.99,
        category: 'fruit'
    },
    {
        name: 'Fairy Eggplant',
        price: 1.99,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Chocolate Milk',
        price: 2.99,
        category: 'dairy'
    }, 
]    
Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})