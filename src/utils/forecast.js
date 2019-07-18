const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/a2a85d7e9afb564e8907d0d3a466aae5/${lat},${long}?units=si`;
    request({ url, json: true }, (err, { body }) => {
        if(err) {
            callback("Unable to connect to weather service");
        } else if(body.err) {
            callback("Unable to find coordinates");
        } else {
            const { temperature, precipProbability } = body.currently;
            callback(undefined, `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast;