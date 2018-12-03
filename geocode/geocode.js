const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    var apiKey = '**************************************';
    // console.log(encodedAddress);
    //1301%20lombard%20street%20philadelphia
    // The request() takes 2 arg, options obj where we can config info and
    // 2nd arg is a callback function, that get call once the data comes back from the HTTP endpoint
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
        json: true
    }, (error, response, body) => {
        //console.log(body);// Logs the json file content on the screen
        // second arg in stringify is used to filter properties, the 3rd arg is gonna format the JSON and u specify the amount of spaces u wanna use per indentation
        // console.log(JSON.stringify(body, undefined, 2));// takes the json file contents, convert it to JS obj and Logs o the screen
        // console.log(JSON.stringify(response, undefined, 2));// The response obj prints a complex obj, it has header, body, request, and own header which get set when json is set true
        // console.log(JSON.stringify(error, undefined, 2));// error obj contains error made when making HTTP request or error from the API
        if(error){ //Check if the error code exist
            callback("Unable to connect to google API server...");
            //console.log("Unable to connect to google API server...");
        }
        else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address...');
            console.log('Unable to find that address...');
        }
        else if(body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,// printing formatted Address from the API
                latitude: body.results[0].geometry.location.lat,// printing Latitude from the API
                longitude: body.results[0].geometry.location.lng,// printing Longitude from the API
            });
        }
        else{
            console.log("ERROR!");
        }
    });
}


module.exports = {
    geocodeAddress
}
