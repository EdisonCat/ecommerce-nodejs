const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.post('/', checkAuth, OrdersController.orders_post_order);

router.patch('/:orderId', checkAuth, OrdersController.orders_patch_order);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

router.delete('/all', checkAuth, OrdersController.orders_delete_all);

module.exports = router;