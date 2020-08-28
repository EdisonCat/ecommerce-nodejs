const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
exports.user_post_signup = (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length > 0) return res.status(409).json({
                message: "user exists"
            });
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) return res.status(500).json({
                        error: err
                    });
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: "signup successfully"
                                });
                                console.log(result);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

exports.user_post_login = (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length < 1) return res.status(401).json({
                message: "Auth failed"
            });
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) return res.status(401).json({
                    message: "Auth failed"
                });
                else if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0].userId
                    }, process.env.JWT_KEY, {expiresIn: "1h"});
                    return res.status(200).json({
                        message: "Login successfully",
                        token: token
                    });
                }
                else return res.status(401).json({
                    message: "Auth failed"
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.user_delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId }).exec()
        .then(result => {
            res.status(200).json({
                message: "user deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}