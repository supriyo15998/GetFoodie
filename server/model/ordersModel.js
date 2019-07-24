const mongoose = require('mongoose');
var orders = mongoose.model('orders', {
    fname: { type:String },
    fdesc: { type:Number },
    cname: { type:String },
    cemail: { type:String },
    cphone: { type:Number },
    cadress: { type:String },
    quan: { type:Number },
    price: { type:Number },
    date: { type:Date }
});
module.exports = orders;