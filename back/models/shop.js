module.exports=(sequelize,DataTypes)=>{
  const Shop=sequelize.define('shop',{
    address:{
      type:DataTypes.TEXT
    },
    shopName:{
      type:DataTypes.TEXT
    },
    part:{
      type:DataTypes.TEXT
    }
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
    sequelize,
  })
  Shop.associate=(db)=>{
  }
  return Shop
}
