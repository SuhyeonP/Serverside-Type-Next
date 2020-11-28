module.exports=(sequelize,DataTypes)=>{
    const Menu=sequelize.define('Menu',{
        menuName:{
            type:DataTypes.STRING(20)
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        sequelize,
    })
    Menu.associate=(db)=>{

    }
    return Menu
}
