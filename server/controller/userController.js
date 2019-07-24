const router = require('../routes/routes');
var userModel = require('../model/userModel');
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
                error: "User doesn't exist"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result) => {
            if(err)
            {
                return res.status(401).json({
                    error: "Authorization Failed"
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
module.exports.userProfile = (req,res,next) => {
    userModel.findOne({ _id: req._id },
            (err,user) => {
                if(!user)
                    return res.status(404).json({ status: false, message: 'User not found' });
                else
                    return res.status(200).json({ status:true, user: _.pick(user,['fullName', 'email']) });
            }
        );
}