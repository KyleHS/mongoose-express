const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => { //very common pattern
    const products = await Product.find({})//how we match every product but does take time
    res.render('products/index', { products }) //not need to put .ejs
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categorries })
})

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
})

app.post('/products', async (req, res) => {
    const newProduct=  new Product(req.body);  //very simple version of this no limitations
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => { 
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show',  { product })
})

app.listen(3000, () => {
    console.log ("app is open on port 3000")
});