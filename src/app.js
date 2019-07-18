const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const publicDirPath = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//HBS setup
//Use set to setup express options
//Pair key value with option name and value
//for view engine expects files to be in ./views
app.set("view engine", "hbs");
app.set("views", viewDir);
hbs.registerPartials(partialsPath);

//Static dir setup
//Express uses an middleware to serve static files
//Using builin module path to join public path with actual dir
app.use(express.static(publicDirPath));

//Use render instead of send to render dynamic pages using the
//selected view engine
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weater HBS",
        name: "Santi"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "Santi"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        message: "This is a helping message. Please contact sales team.",
        name: "Santi"
    })
})

app.get("/weather", (req, res) => {
    const { address } = req.query;
    if(!address) return res.send({
        error: "Address must be provided"
    });
    
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            return res.send({
                forecast: forecastData,
                location,
                address
            });
        })
    });
});

app.get("/products", (req, res) => {
    const { search } = req.query;
    if(!search) {
        return res.send({
            error: "Search term must be provided"
        })
    }
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.status(404).render("404", {
        title: "Error 404",
        name: "Santi",
        errorMessage: "Help article not found"
    });
})

// * is a wildcard
app.get("*", (req, res) => {
    res.status(404).render("404", {
        title: "Error 404",
        name: "Santi",
        errorMessage: "Error 404 not page found"
    });
})

app.listen(3000, () => console.log("App is running on 3000!!"));