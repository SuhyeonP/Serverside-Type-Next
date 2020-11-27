const express = require('express');

const { Shop,Order } = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const order=await Order.create({
            price:req.body.money,
            userOrder:req.body.userId,
            shopGetOrder:req.body.shopId,
            menus:req.body.order,
        })
        const successOrder=await Order.findOne({
            where:{id:order.id},
            attributes:['userOrder','shopGetOrder','menus','price'],
            include:[{
                model:Shop,
                attributes:['shopName']
            }]
        })
        res.status(200).json(successOrder);
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.get('/:shopId', async (req, res, next) => {
    try{
        const getOrder=await Order.findOne({
            where:{shopGetOrder:req.params.shopId},
        })
        if(!getOrder){
            return res.status(404).send('아직 주문이 없어요')
        }
        const fullOrder=await Order.findOne({
            where:{shopGetOrder:getOrder.id},
            attributes:['menus','price','userOrder','shopGetOrder'],
            include:[{
                model:Shop,
                attributes:['shopName','master']
            }]
        })
        res.status(200).json(fullOrder);
    }catch(err){
        console.error(err)
        next(err)
    }
});

module.exports = router;
