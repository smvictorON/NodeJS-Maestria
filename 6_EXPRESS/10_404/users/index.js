const express = require('express')
const router = express.Router()
const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res) => {
    const {name, age} = req.body
    console.log(`O nome do usuario é ${name} e ele tem ${age} anos`);
    res.sendFile(`${basePath}/userform.html`)
})

router.get('/:id', (req, res) => {
    const id = (req.params.id);
    console.log(`Estamos buscando pelo user: ${id}`);
    res.sendFile(`${basePath}/users.html`)
})


module.exports = router
