const {MongoClient} = require('mongodb')

const uri = 'mongodb://localhost:27017/testemongodb'

const client = new MongoClient(uri)

run = async () => {
    try{
        await client.connect()
        console.log("Conectando ao MongoDB!");
    }catch(err){
        console.log("Erro na conexão com o MongoDB!");
    }
}

run()

module.exports = client