const router = require('../routes/routes');
var foodModel = require('../model/foodModel');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports.registerFood = (req,res) => {
    var food = new foodModel({
        fname: req.body.fname,
        fdesc: req.body.fdesc,
        fprice: req.body.fprice,
        fpic: req.body.fpic,
        category_id: req.body.category_id
    });
    food.save((err,doc) => {
        if(!err)
            res.send(doc);
        else   
            console.log('Error in insertion');
    })
}

module.exports.getFood = (req, res) => {
    foodModel.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving foods :' + JSON.stringify(err, undefined, 2)); }
    });
}
module.exports.getFoodById = (req,res) => {
    foodModel.findById(req.params.id, (err,doc) => {
        if(!err)
            res.send(doc);
        else
            console.log(err);
    })
}
module.exports.updateFood = (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({
            "error": `No record with given id = ${req.params.id}`
        })
    }
    else{
        var food = {
            fname: req.body.fname,
            fdesc: req.body.fdesc,
            fprice: req.body.fprice,
            fpic: req.body.fpic,
            category_id: req.body.category_id
        };
        foodModel.findByIdAndUpdate(req.params.id, { $set:food }, { new:true }, (err,doc) => {
            if(!err)
                res.send(doc);
            else{
                return res.status(500).json({
                    "error": "Internal Server Error"
                });
            }
        })
    }
};
module.exports.deleteFood = (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({
            "error": `No record with given id = ${req.params.id}`
        })
    }
    else{
        foodModel.findByIdAndRemove(req.params.id, (err,doc) => {
            if(!err)
                res.send(doc);
            else {
                return res.status(500).json({
                    "error": "Internal Server Error"
                })
            }
        })
    }
}
module.exports.getFoodCatID = (req,res) => {
    foodModel.find({ "category_id": req.params.id }, (err,docs) => {
        if(!err)
            res.send(docs);
    });
}
