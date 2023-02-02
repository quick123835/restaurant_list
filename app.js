const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

const app = express()
const port = 3000
const restaurantList = restaurants.results

app.engine('handlebars',exphbs({ defaultLayout:'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('index', { restaurants:restaurantList })
})

app.get('/search',(req,res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))
    res.render('index',{ restaurants:restaurants,})
})

app.get('/restaurants/:id', (req,res) => {
    const id = req.params.id
    const restaurant = restaurantList.find((restaurant) => restaurant.id == id)
    res.render('show', { restaurant:restaurant })
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})