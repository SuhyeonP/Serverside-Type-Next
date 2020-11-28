const express = require('express');
const { Op } = require('sequelize');

const { Shop,Menu,MenuPart } = require('../models');
const router = express.Router();


router.get('/menus/:shopId/more', async (req, res, next) => {
  try {
    console.log(req.query,req.params)
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      where.shopId=req.params.shopId
    }
    const shops = await Menu.findAll({
      where,
      limit:4 ,
      order: [
        ['id'],
      ],
      attributes:['id','menuName','price','shopId'],
    });
    res.status(200).json(shops);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:shopId/menus',async(req,res,next)=>{
  try{
    const where={};
    if(parseInt(req.query.lastId,10)){
      where.id={[Op.lt]:parseInt(req.query.lastId,10)}
    }
    console.log("lastId:",parseInt(req.query.lastId,10))
    const Ss=await Shop.findOne({
      where:{id:req.params.shopId},
      attributes:['id','address','shopName','part','master'],
      include:[{
        model:Menu,
        where,
        limit:3,
        order: [['id','DESC']],
        attributes:['id','menuName','price','shopId'],
        include:[{
          model:MenuPart,
          attributes:['id','partName']
        }],
      }]
    })

    const hh=new Set()
    Ss.Menus.map(x=>{
      hh.add(x.MenuPart.dataValues.partName)
    })
    console.log(hh)
    res.status(200).json({shop:Ss,part:[...hh]});
    }catch(err){

  }
})


module.exports = router;
