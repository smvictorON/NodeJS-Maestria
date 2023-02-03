const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', 'ilewml', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log("Conectado!")
}catch(err){
    console.log("Erro na conexão! ", err);
}

module.exports = sequelize