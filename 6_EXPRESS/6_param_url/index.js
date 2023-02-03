const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const basePath = path.join(__dirname, 'templates')
// const checkAuth = function(req, res, next) {
//     req.authStatus = true
//     req.authStatus ? console.log("LOGADO") : console.log("NÃO LOGADO");
//     next()
// }

// app.use(checkAuth)

app.get('/users/:id', (req, res) => {
    const id = (req.params.id);

    console.log(`Estamos buscando pelo user: ${id}`);

    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})