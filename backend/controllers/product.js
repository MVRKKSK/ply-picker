const Product = require("../models/product")
const formidable = require("formidable")
const _ = require('lodash');
const fs = require("fs");
const product = require("../models/product");

exports.create = (req, res) => {
    /* let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'photo could not be uploaded'
            });
        }
        let product = new Product(fields);
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        } */

        const product = new Product(req.body)

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: "something went wrong"
                });
            }
            res.json(result);
        });
    /* }); */
};

exports.productId = (req, res ,next ,id) => {
    Product.findById(id).exec((err , product) => {
        if (err || !product ) {
            console.log('PRODUCT CREATE ERROR ', err);
            return res.status(400).json({
                error: "something went wrong"
            });
        }
        req.product = product;
        next();
    })
}


exports.remove = (req,res,id) => {
    let product = req.product;
    product.remove((err , deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "something went wrong"
            });
        }

        res.json({
            deletedProduct ,
            message: "product has deleted successfully"
        })
    })
};

exports.update = (req, res) => {

        let product = req.product
        product = _.extend(product)

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: "something went wrong"
                });
            }
            res.json(result);
        });

};


exports.list = (req,res) => {
    let order = req.query.order ? req.query.order : "desc"
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    let limit = req.query.limit ? parseInt(req.query.limit) : "30"
    Product.find()
    .populate("Category")
    .sort([[sortBy , order]])
    .limit(limit)
    .exec((err , data) => {
        if(err){
            res.status(400).json({
                error:"product not found"
            })
        }

        res.json(data)
    })
}


exports.ListRelated = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : "3"

    Product.find({_id: {$ne : req.product} , Category: req.product.Category})
    .limit(limit)
    .populate("Category")
    .exec((err , products) => {
        if(err){
            res.status(400).json({
                error:"product not found"
            })
        }

        res.json(products) 
    })
}

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "Product_Price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .populate("Category")
        .sort([[sortBy, order]])
        /* .skip(skip) */
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};