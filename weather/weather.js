const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    var latitude = latitude;
    var longitude = longitude;
    request({
        url: `https://api.forecast.io/forecast/4o0ef4jrew423/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to forecast API...');
        }
        else if(response.statusCode === 400){
            callback('Unable to fetch weather...');
        }
        else if(!error && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature, // temperature of given lat and long from the API
                apparentTemperature: body.currently.apparentTemperature // Current temperature
            });
        }
        else{
            callback('BIG ERROR!');
        }
    });
}


module.exports = {
    getWeather
}