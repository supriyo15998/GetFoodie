const router = require('../routes/routes');
var CategoryModel = require('../model/categoryModel');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports.insertCategory = (req,res) => {
    var category = new CategoryModel({
        categoryname: req.body.categoryname
    });
    category.save((err,doc) => {
        if(!err)
            res.send(doc);
        else
            console.log('Error in insertion');
    })
}
module.exports.getCategory = (req,res) => {
    CategoryModel.find((err,docs) => {
        if(!err)
            res.send(docs);
        else
            console.log(err);
    });
}
module.exports.deleteCategory = (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({
            "error": `No record with given id = ${req.params.id}`
        })
    }
    else {
        CategoryModel.findByIdAndRemove(req.params.id, (err,doc) => {
            if(!err)
                res.send(doc);
            else
            {
                return res.status(500).json({
                    "error": "Internal Server Error"
                })
            }
        })
    }
}
module.exports.editCategory = (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({
            "error": `No record with given id = ${req.params.id}`
        })
    }
    else {
        var category = {
            categoryname: req.body.categoryname
        };
        CategoryModel.findByIdAndUpdate(req.params.id, { $set: category }, { new:true }, (err,doc) => {
            if(!err)
                res.send(doc)
            else {
                return res.status(500).json({
                    "error": "Internal server error"
                })
            }
        });
    }
};
module.exports.getCategoryById = (req,res) => {
    CategoryModel.findById(req.params.id, (err,doc) => {
        if(!err)
            res.send(doc);
        else
            console.log(err);
    });
}