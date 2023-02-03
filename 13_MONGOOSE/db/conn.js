const mongoose = require('mongoose')

main = async() => {
    await mongoose.connect('mongodb://localhost:27017/testemongoose')
    console.log("Conectado ao MongoDB com Mongoose");
}

main().catch((err) => console.log(err))

module.exports = mongoose