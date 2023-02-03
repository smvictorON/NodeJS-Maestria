const express = require('express')
const app = express()
const path = require('path')
const basePath = path.join(__dirname, 'templates')
const userRouter = require('./users')
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use(express.static('public'))

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})

app.use((req, res, next) => {
    res.status(404).sendFile(`${basePath}/404.html`)
})