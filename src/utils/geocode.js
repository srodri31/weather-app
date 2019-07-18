const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3JvZHJpMzEiLCJhIjoiY2p5N21wMmx5MDEydjNudDFpaTkxMWhvNSJ9.6QjBSdkR2NVn469qrN-J7A&limit=1`
    request({ url, json: true }, (err, { body }) => {
        if(err) {
            callback("Unable to connect to location service");
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search");    
        } else {
            const [long, lat] = body.features[0].center;
            callback(undefined, {
                latitude: lat,
                longitude: long,
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;