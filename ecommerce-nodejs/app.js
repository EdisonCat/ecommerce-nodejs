const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const mongoosae = require('mongoose');
const userRoutes = require('./api/routes/user');
// mongoosae.connect(
//     "mongodb+srv://dev:" + process.env.MONGO_ATLAS_PWD + "@cluster0.xtiy0.mongodb.net/<dbname>?retryWrites=true&w=majority", 
//     {
//         useMongoClient: true
//     });
mongoosae.connect(
    "mongodb+srv://dev:" + process.env.MONGO_ATLAS_PWD + "@cluster0.xtiy0.mongodb.net/<dbname>?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET")
        return res.status(200).json({});
    }
    next();
});
//handle reqs
app.use('/user', userRoutes);
app.use('/products', productsRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/orders', ordersRoutes);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});



//parameters passed by previous function should be in the front of the signiture of the next funciton
//here, it's err
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});
module.exports = app;