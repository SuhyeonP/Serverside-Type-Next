const express = require('express');
const { Op } = require('sequelize');

const { Shop } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => { // GET /shops
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
        const shops = await Shop.findAll({
            where,
            limit:6 ,
            order: [
                ['id', 'DESC'],
            ]
        });
        res.status(200).json(shops);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
