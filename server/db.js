const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/getfoodie', { useNewUrlParser: true } , (err) => {
    if(!err)
        console.log('Database connection successful')
    else   
        console.log('Error occured');
});
module.exports = mongoose;