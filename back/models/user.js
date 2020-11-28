module.exports=(sequelize,DataTypes)=>{
  const User=sequelize.define('user', {
    userId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nick: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    shopMaster:{
      type:DataTypes.INTEGER
    }
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
    sequelize,
  })
  User.associate=(db)=>{
  }
  return User
}
