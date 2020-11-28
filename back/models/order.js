module.exports=(sequelize,DataTypes)=>{
    const Order=sequelize.define('order',{
        menus:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        sequelize,
    })
    Order.associate=(db)=>{

    }
    return Order;
}
