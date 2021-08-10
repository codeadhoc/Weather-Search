const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars views and location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/about', (req, res) => {

    const _about = {
        title: "About Me",
        author: "Viral Gohil"
    }

    res.render("about", _about);
});

app.get('/help', (req, res) => {

    const _msg = {
        title: "Help Desk",
        message: "For help kind contact on admin@gmail.com",
        author: "Viral Gohil"
    }

    res.render("help", _msg);
});

app.get('/weather', (req, res) => {

    //check the query string
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    //call the geocode to find the coordinate of based on address
    geocode(req.query.address, (error, geoData) => {

        //check for error and incase break the execution 
        if (error) {
            return res.send({ error });
        }

        const { longitude, latitude, location } = geoData;

        //call the forecast to fetch weather
        forecast(longitude, latitude, (error, forecastData) => {

            //check for error and incase break the execution
            if (error) {
                return res.send({ error });
            }

            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});


app.get('', (req, res) => {

    const _default = {
        title: "Welcome to weather App",
        author: "Viral Gohil"
    }

    res.render("index", _default);
});


app.get('*', (req, res) => {

    const _error = {
        title: "404",
        author: "Viral Gohil",
        message: "Page Not Found"
    }

    res.render("error", _error);
});

app.listen(3000);