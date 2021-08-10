const request = require("request");

let _BaseURI = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
let _AccessKey = "";


//function to get the long/lati based on address
const geocode = function (address, callback) {

    //form the dynamic mapbox url
    const _URI = _BaseURI + encodeURI(address) + ".json?access_token=" + _AccessKey;

    //configure the options
    const _Options = {
        url: _URI,
        json: true
    };

    //make the request
    request(_Options, (error, { body } = {}) => {

        //check for error
        if (error) {
            return callback("Unable to connect", undefined);
        }
        else if (body.features.length === 0) {
            return callback("Unable to find location. Try another search", undefined);
        }
        else {
            return callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}


module.exports = geocode;