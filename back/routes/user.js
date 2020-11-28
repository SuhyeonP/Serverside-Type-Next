const express = require('express');
const {User,Shop,Order}=require('../models')
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: ['id','userId','nick','shopMaster'],
      })
      let userReLoad= {};
      if(fullUserWithoutPassword.dataValues.shopMaster===1){
        const shopFind=fullUserWithoutPassword.dataValues.id
        const theShop=await Shop.findOne({
          where:{master:shopFind},
          attributes:['id','shopName','master','part']
        })
        userReLoad={me:fullUserWithoutPassword,shopIsMe:theShop}
        return res.status(200).json(userReLoad);
      }
      return res.status(200).json({me:fullUserWithoutPassword});
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: ['id','userId','nick','shopMaster'],
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});


router.post('/slogin', (req, res, next) => {
  passport.authenticate('local',(err,user,info)=>{
    if(err){
      console.error(err);
      return next(err)
    }
    if(info){
      return res.status(401).send(info.reason)
    }
    return req.login(user,async(loginErr)=>{
      if(loginErr){
        console.error(loginErr)
        return next(loginErr)
      }
      const client=await Shop.findOne({
        where:{master:user.id},
        attributes:['id','shopName','master','address'],
        include:[{
          model:User,
          attributes:['nick','id','userId','shopMaster']
        }]
      })
      return res.status(200).json(client);
    })
  })(req,res,next)
});


router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});


router.post('/shop', isLoggedIn, async (req, res, next) => { // POST /user/
  try {
    console.log(req.body)
    await Shop.create({
      address:req.body.address,
      master:parseInt(req.body.master,10),
      shopName:req.body.shopName,
      part:req.body.part,
    })
    await User.update({
      shopMaster:req.body.shopMaster,
    },{
      where:{id:req.body.master}
    })
    res.status(201).send('success')
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});


router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      }
    });
    if (exUser!==null) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      userId: req.body.userId,
      nick: req.body.nick,
      password: hashedPassword,
      shopMaster:req.body.shopMaster,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

module.exports = router;
