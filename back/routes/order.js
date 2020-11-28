const express = require('express');
const { Op } = require('sequelize');
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

router.get('/test/paging',async(req,res,next)=>{
    try{
        const allOrder=await Order.findAll({
            attributes:['id','menus','price']
        })
        console.log(allOrder.length)
        return res.status(200).json(allOrder)
    }catch(err){
        console.error(err)
        next(err)
    }
})

router.get('/shopsOrder/:shopId',async(req,res,next)=>{
    try {
        const getOrder=await Order.findOne({
            where:{shopGetOrder:parseInt(req.params.shopId,10)},
            attributes:['id']
        })
        if(!getOrder){
            return res.status(404).send('아직 주문이 없어요')
        }
        const only1Shop=await Order.findAll({
            where:{shopGetOrder:parseInt(req.params.shopId,10)},
            order:[['createdAt','DESC']],
            limit:4,
            attributes:['menus','price','createdAt'],
            include:[{
                model:User,
                attributes:['nick']
            }]
        })
        res.status(200).json(only1Shop)
    } catch (error) {
        console.error(error);
        next(error);
    }
});



module.exports = router;
