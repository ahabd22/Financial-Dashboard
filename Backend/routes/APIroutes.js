const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/price/:symbol', stockController.getStockPrice);

module.exports = router;