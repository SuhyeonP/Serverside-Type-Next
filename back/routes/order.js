const express = require('express');

const { Shop,Order,User } = require('../models');
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
        console.log('asdf',req.params.shopId)
        const getOrder=await Order.findOne({
            where:{shopGetOrder:parseInt(req.params.shopId,10)},
            attributes:['id']
        })
        console.log("asdf2",getOrder)
        if(!getOrder){
            return res.status(404).send('아직 주문이 없어요')
        }
        const fullOrder=await Order.findAll({
            where:{shopGetOrder:parseInt(req.params.shopId,10)},
            limit:3,
            attributes:['menus','price','userOrder','shopGetOrder'],
            include:[{
                model:Shop,
                attributes:['master','shopName'],
            },{
                model:User,
                attributes:['nick','userId'],
            }]
        })
        res.status(200).json(fullOrder);
    }catch(err){
        console.error(err)
        next(err)
    }
});

module.exports = router;
