const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const items = ['ItemA', 'ItemD', 'ItemC']

    res.render('dashboard', {items})
})

app.get('/', (req, res) => {
    const user = {
        name: "Victor",
        surname: "Mussio"
    }

    const auth = true
    const approved = false

    res.render('home', {user: user, auth, approved})
})

app.listen(3000, () => {
    console.log("App rodando na porta 3000");
})