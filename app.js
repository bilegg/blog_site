const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.listen(3000, () => {
	console.log('server starting at port 3000')
})

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/about', (req, res) => {
	res.render('about')
})

app.get('/blogs/create', (req, res) => {
	res.render('create')
})