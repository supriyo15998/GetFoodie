const mongoose = require('mongoose');
var orders = mongoose.model('orders', {
    fname: { type:String },
    fdesc: { type:String },
    cname: { type:String },
    cemail: { type:String },
    cphone: { type:Number },
    caddress: { type:String },
    quan: { type:Number },
    price: { type:Number },
    date: { type:String }
});
module.exports = orders;