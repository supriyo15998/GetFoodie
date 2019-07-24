const mongoose = require('mongoose');
var foodModel = mongoose.model('foods', {
    fname: { type:String },
    fdesc: { type:String },
    fprice: { type:Number },
    fpic: { type:String },
    category_id: { type:String }
})
module.exports = foodModel;