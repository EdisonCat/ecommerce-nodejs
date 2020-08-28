const Product = require('../models/products');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find().select('_id name price productImage').exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            url: 'http://localhost:3000/products/' + doc._id,
                            type: 'GET'
                        }
                    }
                })
            }

            if (docs.length > 0) res.status(200).json(response);
            else res.status(500).json({
                message: "No Products Data Found"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('_id name price productImage').exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else res.status(404).json({
                message: "ProductId Not Found"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.products_patch_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const op of req.body) updateOps[op.propName] = op.value;
    Product.update({ _id: id }, { $set: updateOps }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.products_post_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Product Posting Succeeded",
                product: {
                    name: result.name,
                    id: result._id,
                    price: result.price
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Product Posting failed",
                error: error
            });
        });
}

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
}