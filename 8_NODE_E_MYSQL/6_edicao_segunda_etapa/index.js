const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

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

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/books', (req, res) => {
    const sql = `SELECT * FROM books`
    conn.query(sql, (err, data) => {
        if(err)
            return console.log(err)

        const books = data

        res.render('books', {books})
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id=${id}`
    conn.query(sql, (err, data) => {
        if(err)
            return console.log(err)

        const book = data[0]

        res.render('book', {book})
    })
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty
    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}','${pageqty}')`
    conn.query(sql, (err) => {
        if(err)
            return console.log(err)

        res.redirect('/books')
    })
})

app.post('/books/updatebook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty
    const id = req.body.id

    const sql = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`
    conn.query(sql, (err) => {
        if(err)
            return console.log(err)

        res.redirect('/books')
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id=${id}`
    conn.query(sql, (err, data) => {
        if(err)
            return console.log(err)

        const book = data[0]

        res.render('editbook', {book})
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ilewml',
    database: 'nodemysql',
})

conn.connect((err) =>{
    if(err){
        console.log(err);
        return
    }
    console.log('CONECTADO!')
    app.listen(3000)
})