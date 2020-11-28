module.exports=(sequelize,DataTypes)=>{
    const MenuPart=sequelize.define('menupart',{
        menuName:{
            type:DataTypes.STRING(20)
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        sequelize,
    })
    MenuPart.associate=(db)=>{
        db.MenuPart.hasMany(db.Menu);
    }
    return MenuPart
}
