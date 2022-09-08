const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    category: {type: String, required:true},
    title: {type: String, required:true},
    price:{type: Number, required:true},
    image: {type: String, required:true},
    description: {type: String, required:true},
    // user:{type: Schema.Types.ObjectId, ref: 'User'} 
});

const Product = mongoose.model("Product", productSchema);


module.exports = Product