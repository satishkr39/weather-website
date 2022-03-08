const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname) // gives directory name of the file
// console.log(path.join(__dirname, '..')) // one location up of our directory
console.log(path.join(__dirname, '../public'))
// console.log(__filename) // five complete directory location along with file name

// init our application
const app = express()

// EXPRESS PATHS CONFIG
// store our html pages in variable
const publicDirectoryPath = path.join(__dirname, '../public')
//view const path
const viewsPath = path.join(__dirname, '../templates/views')
// const partials path
const partialsPath = path.join(__dirname,'../templates/partials')
// SETUP HANDLEBARS AND VIEW LOCATION
app.set('view engine', 'hbs')
// custom views folder location
app.set('views', viewsPath)
// register our partials
hbs.registerPartials(partialsPath)


// to tell our app to use the static folder location for all our html pages
app.use(express.static(publicDirectoryPath))

// default routing : mywebsite.com : can also we removed as we provided static index.html in public 
// folder. so express knows to use that.
app.get('', (req, res) =>{
    //res.send('<h2>Hello Express!!!</h2>')
    res.render('index', {
        title :'weather app',
        name: 'satish singh'

    })
})

// about page routing : mywebsite.com/about
app.get('/about', (req, res) =>{
    // res.send('<h1> About Page </h1>')
    res.render('about', {
        title:"About Title",
        name: "Satish Kumar"
    })
})

// help page
app.get('/help', (req, res) =>{
    //res.send('Help Page')
    res.render('help', {
        message : 'Message sent from app.js : HELP ROUTE',
        title : 'Title for Help Message from HELP ROUT',
        name : 'satish kumar'
    })
})
// route help specific error
app.get('/help/*', (req, res) =>{
    res.render('error', {
        title: 'Help Error Message',
        errorMessage : 'Help Error Message'
    })
})


// weather page : modify to make it accept address from user.
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            errorMessage : 'You must provide address'
        })
    }
    console.log(req.query.address)   
    geoCode.geoCode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
    // if user doesn't provide any location while executing the program 
    if(error){
        return res.send({
            errorMessage :error
        })
    }
    // callback chaining. calling a callback inside another callback
    forecast.forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({
                errorMessage : error
            })
        }
        res.send({
            address : location,
            forcastData : forecastData.location.region,
            temperature : forecastData.current.temperature
        })
               
    })
    
})
    // res.send({
    //     location : 'Bihar',
    //     temperature : 30,
    //     address : req.query.address
    // })
})

// query string setup
app.get('/product', (req, res) =>{
    console.log(req.query) // prints the query string 
    console.log(req.query.search)  // to grab individual values
    if(!req.query.search){
        return res.send({
            error: 'YOu must provide search term'
        })
    }
    res.send({
        products : []
    })
})

// 404 page
app.get('*', (req, res) => {
    //res.send("Error Page")
    res.render('error', {
        title: 'Error 404 Message',
        name : 'Satish Singh',
        errorMessage : 'Error : 404 Page Not Found'
    })
})

// listening on port 3000
app.listen(3000, () => {
    console.log(' server is up running at localhost:3000')
})


// to execute the application : node src/app.js
// to execute app from browser : node src/app.js
// to get weather info from web browser : go to url bar and type http://localhost:3000/weather?address=Gujarat 
// weather info will be displayed in webpage.