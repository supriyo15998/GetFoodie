const mongoose = require('mongoose');
var categories = mongoose.model('categories', {
    categoryname: { type: String }
});
module.exports = categories;