const Order = require('../models/orders');
const Product = require('../models/products');
const mongoose = require('mongoose');
exports.orders_get_all = (req, res, next) => {
    Order.find().select('_id quantity product').populate('product', 'name').exec()
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'DELETE',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            }
            if (docs.length > 0) res.status(200).json(response);
            else res.status(500).json({
                message: "No Orders Data Found"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
exports.orders_get_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id).select('_id product quantity')
        .populate('product', 'name price').exec()
        .then(doc => {
            if (doc) res.status(200).json({
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
            });
            else res.status(500).json({
                message: "OrderId Not Found"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.orders_post_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) return res.status(404).json({
                message: 'Product Not Found'
            });
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: product
            });
            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: "Order Posted",
                order: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.orders_patch_order = (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const op of req.body) updateOps[op.propName] = op.value;
    Order.update({ _id: id }, { $set: updateOps }).exec()
        .then(result => {
            console.log(result.quantity);
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Order Updating Failed"
            });
        });
}

exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId;
    if(id === 'all') return next();
    Order.deleteOne({ _id: id }).exec()
        .then(result => {
            console.log("order " + id + " deleted");
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500);
        });
}

exports.orders_delete_all = (req, res, next) => {
    Order.find().exec()
        .then(docs => {
            if (docs.length > 0) {
                docs.map(doc => {
                    Order.deleteOne({ _id: doc._id }).exec()
                        .then(result => {
                            res.status(200).json(result)
                            console.log("order " + doc._id + " deleted");
                        })
                        .catch(err => {
                            res.status(500);
                            return;
                        });
                });
            }
            else res.status(500).json({ message: "not found" });
        })
        .catch(err => { res.status(500).json({ error: err }); });
}