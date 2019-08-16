const router = require('../routes/routes');
var userModel = require('../model/userModel');
var orderModel = require('../model/ordersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const _ = require('lodash');
const config = require('../config/config');
module.exports.registerUser = (req,res,next) => {
    var user = new userModel();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.password = req.body.password;
    user.save((err,doc)=> {
        if(!err)
            res.send(doc);
        else {
            if(err.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else    
                return next(err);
        }
    });
}

module.exports.loginUser = (req,res, next) => {
    userModel.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1)
        {
            return res.status(404).json({
                error: {
                    email: "User doesn't exist"
                }
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result) => {
            if(err)
            {
                return res.status(401).json({
                    error: {
                        email: "Authorization Failed"
                    }
                });
            }
            if(result)
            {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXP
                });
                return res.status(200).json({
                    message: "Authorization Success",
                    token: token
                });
            }
            res.status(401).json({
                error: {
                    password: "Incorrect password"
                }
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
module.exports.userProfile = (req,res,next) => {
    userModel.findOne({ _id: req._id },
            (err,user) => {
                if(!user)
                    return res.status(404).json({ status: false, message: 'User not found' });
                else
                    return res.status(200).json({ status:true, user: _.pick(user,['fullName', 'email', 'phone', 'address']) });
            }
        );
}
module.exports.placeOrder = (req,res) => {
    var order = new orderModel();
    order.fname = req.body.fname;
    order.fdesc = req.body.fdesc;
    order.cname = req.body.cname;
    order.cemail = req.body.cemail;
    order.cphone = req.body.cphone;
    order.caddress = req.body.caddress;
    order.quan = req.body.quan;
    order.price = req.body.price;
    order.date = req.body.date;
    order.save((err,doc) => {
        if(!err)
            res.send(doc);
        else {
            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    });
}
module.exports.getUserOrder = (req,res) => {
    orderModel.find({cemail: req.params.cemail}, (err,doc) => {
        if(!err)
        {
            res.send(doc);
        }
        else
        {
            return res.status(500).json({
                error: "Internal Server Error"
            })
        }
    })
}