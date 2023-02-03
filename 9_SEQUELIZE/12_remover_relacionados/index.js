const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const Address = require('./models/Address')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
    newsletter = newsletter === 'on' ? true : false

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {UserId, street, number, city}

    await Address.create(address)

    res.redirect(`/users/edit/${UserId}`)
})

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({raw: true, where: {id: id}})
    res.render('userview', {user})
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id;
    await User.destroy({where: {id: id}})
    res.redirect('/')
})

app.post('/address/delete', async (req, res) => {
    const UserId = req.body.UserId
    const id = req.body.id;
    await Address.destroy({where: {id: id}})
    res.redirect(`/users/edit/${UserId}`)
})

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findOne({include: Address, where: {id: id}})
        res.render('useredit', {user: user.get({plain: true})})
    }catch(err){
        console.log(err)
    }
})

app.post('/users/update', async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
    newsletter = newsletter === 'on' ? true : false
    const userdata = {id, name, occupation, newsletter}

    await User.update(userdata, {where: {id: id}})

    res.redirect('/')
})

app.get('/', async (req, res) => {
    const users = await User.findAll({raw: true})
    res.render('home', {users})
})

conn
.sync()
// .sync({force: true})
.then(() => {
    app.listen(3000)
}).catch((err) => {
    console.log(err);
})