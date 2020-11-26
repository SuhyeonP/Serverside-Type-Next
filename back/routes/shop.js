const express = require('express');
const { Op } = require('sequelize');

const { Shop,Menu,MenuPart } = require('../models');
const router = express.Router();


router.get('/:shopId', async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: { id: req.params.shopId },
      order:[[Menu,MenuPart,'id']],
      attributes:['id','address','shopName','part','master'],
      include:[{
        model:Menu,
        attributes:['id','menuName','price','shopId'],
        include:[{
          model:MenuPart,
          attributes:['id','partName']
        }],
      }]
    });
    const hh=new Set()
    shop.Menus.map(x=>{
      hh.add(x.MenuPart.dataValues.partName)
    })
    console.log({shop:shop,part:[...hh]})
    res.status(200).json({shop:shop,part:[...hh]});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
