const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.listen(3000, () => {
	console.log('server starting at port 3000')
})

app.get('/', (req, res) => {
	res.render('index', {title: 'Home'})
})

app.get('/about', (req, res) => {
	res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
	res.render('create', {title: 'Create a new blog'})
})

app.use((req, res) => {
	res.render('404', {title: 'Error'})
})