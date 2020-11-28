module.exports=(sequelize,DataTypes)=>{
    const Order=sequelize.define('Order',{
        menus:{
            type:DataTypes.STRING(100),
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
