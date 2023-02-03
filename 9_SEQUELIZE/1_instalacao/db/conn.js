const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', 'ilewml', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
}catch(err){
    console.log("Erro na conexão! ", err);
}

module.exports = sequelize