module.exports=(sequelize,DataTypes)=>{
    const Menu=sequelize.define('menu',{
        menuName:{
            type:DataTypes.STRING(20)
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        sequelize,
    })
    Menu.associate=(db)=>{
        db.Menu.belongsTo(db.Shop,{foreignKey:'shopId'});
        // db.Menu.belongsToMany(db.MenuPart,{through:'MenuEach',as:'MenuToPart',foreignKey:'menuPart'});
        db.Menu.belongsTo(db.MenuPart,{foreignKey:'menuPart'});
    }
    return Menu
}
