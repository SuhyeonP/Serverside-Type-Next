const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passportConfig=require('./passport');


const shopRouter=require('./routes/shop');
const shopsRouter=require('./routes/shops');
const userRouter=require('./routes/user');
const orderRouter=require('./routes/order');
const db = require('./models');
const app=express();

dotenv.config()


db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

// if(process.env.NODE_ENV === 'production'){
//   app.use(morgan('combined'));
//   app.use(hpp())
//   app.use(helmet())
//   app.use(cors({
//     origin: ['http://localhost:3000','http://localhost:80','http://54.180.80.58','http://honeyhyoni.shop','http://data.honeyhyoni.shop'],
//     credentials: true,
//   }));
// }else{
//   app.use(morgan('dev'));
//   app.use(cors({
//     origin: ['http://localhost:3000','http://localhost:80','http://54.180.80.58','http://honeyhyoni.shop','http://data.honeyhyoni.shop'],
//     credentials: true,
//   }));
// }

app.use(morgan('dev'))
app.use(cors({
  origin:['http://localhost:3000','http://localhost:80','http://54.180.80.58','http://honeyhyoni.shop','http://54.180.80.58/','http://data.honeyhyoni.shop'],
  credential:true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user',userRouter);
app.use('/shop',shopRouter);
app.use('/shops',shopsRouter);
app.use('/order',orderRouter);

app.listen(3050, () => {
  console.log('서버 실행 중!');
});
