const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    if(!name)
        return res.status(422).json({message: "O campo nome é obrigatório"})

    if(!price)
        return res.status(422).json({message: "O campo preço é obrigatório"})

    res.status(201).json({message: `O produto ${name} com preço ${price} foi criado com sucesso`})
})

app.get('/', (req, res) => {
    res.status(200).json({message: "Primeira rota criada com sucesso!"})
})

app.listen(3000)