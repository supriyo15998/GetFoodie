const router = require('../routes/routes');
var adminModel = require('../model/adminModel');
var userModel = require('../model/userModel');
var orderModel = require('../model/ordersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const _ = require('lodash');
const config = require('../config/config.js')
module.exports.registerAdmnin = (req,res,next)=> {
    var admin = new adminModel();
    admin.fullName = req.body.fullName;
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else {
            if(err.code == 11000)
            {
                res.status(422).send(['Duplicate email address found'])
            }
            else
                return next(err);
        }
    });
}
module.exports.loginAdmin = (req,res,next) => {
     adminModel.find({ email: req.body.email })
     .exec()
     .then(admin => {
         if(admin.length < 1)
         {
             return res.status(404).json({
                 error: "user doesn't exist"
             });
         }
         bcrypt.compare(req.body.password, admin[0].password, (err,result)=>{
            if(err)
            {
                return res.status(401).json({
                    error: "Authorization failed"
                });
            }
            if(result)
            {
                const token = jwt.sign({
                    email: admin[0].email,
                    userId: admin[0]._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXP
                });
                return res.status(200).json({
                    message:"Authorization Success",
                    token: token
                });
            }
            res.status(401).json({
                error: "Incorrect Password"
            })
         });
     })
     .catch(err=>{
         console.log(err);
         res.status(500).json({
             error: err
         });
     });
};
module.exports.adminProfile = (req,res,next) => {
    adminModel.findOne({ _id: req._id },
            (err,admin) => {
                if(!admin)
                    return res.status(404).json({ status: false, message: 'User not found' });
                else
                    return res.status(200).json({ status:true, admin: _.pick(admin,['fullName', 'email']) });
            }
        );
}
module.exports.getRegUsers = (req,res) => {
    userModel.find((err,docs) => {
        if(err)
            res.send(err)
        else
            res.send(docs);
    });
}
module.exports.viewOrders = (req,res) => {
    orderModel.find((err,docs)=>{
        if(err)
            res.send(err);
        else
            res.send(docs);
    });
}