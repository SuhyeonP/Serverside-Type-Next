const express = require('express');
const { Op } = require('sequelize');

const { Shop,User } = require('../models');
const router = express.Router();


router.get('/:shopId', async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: { id: req.params.shopId },
      attributes:['shopName','master','id','part','address']
    });
    console.log("shop:",shop)
    res.status(200).json(shop);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
