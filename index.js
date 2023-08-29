const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product'); //how we include from other js file

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open")
    })
    .catch(err => {
        console.log("failed to open")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => { //very common pattern
    const products = await Product.find({})//how we match every product but does take time
    res.render('products/index', { products }) //not need to put .ejs
})

app.get('/products/:id', async (req, res) => { 
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show',  { product })
})

app.listen(3000, () => {
    console.log ("app is open on port 3000")
});