const piccontroller = require('./controller/picsController');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db.js');
const route = require('./routes/routes');
var publicDir = require('path').join(__dirname,'/uploads');
console.log(publicDir);
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin:'http://localhost:4200'}));
app.listen(3300, () => {
    console.log('Server deployed in port 3300');
});
app.use('/',route);
app.use(express.static(publicDir));
app.use('/insertPic',piccontroller);