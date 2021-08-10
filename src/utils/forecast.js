const request = require("request");

//API and Accesskey to connect with weather service
let _BaseURI = "http://api.weatherstack.com/current";
let _Accesskey = "";


const forecast = (longitude, latitude, callback) => {

    const _URI = _BaseURI + "?access_key=" + _Accesskey + "&query=" + longitude + "," + latitude;

    //configure options for service
    const _Options = {
        url: _URI,
        json: true
    };

    //make the request to service
    request(_Options, (error, { body } = {}) => {

        //check for any error related to request/system
        if (error) {
            callback("Unable to connect to weather service !", undefined);
        }
        else if (body.error) {
            callback("Unable to find location", undefined);
        }
        else {
            const { temperature, feelslike } = body.current;
            callback(undefined, "It is currently " + temperature + " degrees out. Its feels like " + feelslike + " degree");
        }
    });
};


module.exports = forecast;