const request = require('request')

// code to fetch the longitude and latitude from mapbox service and return in app.js
const geoCode = (address, callback) => {
    // encodeURIComponent is to convert special charcter into some url format
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2F0aXNoa3I2MzkiLCJhIjoiY2t4b3I1bWZwMDJrNDJwbzIxZjB6bXY3cCJ9.KR7UTWnMLZyPXXLd8mHuDg'
    request({uri: url, json : true}, (error, response) =>{
        if(error){
            callback('Unable to access mapbox service!', undefined)
        }
        else if (response.body.features.length == 0){
            callback('Unable to find location. Please search different one.', undefined)
        }
        else{
            // if everything is perfect we get the longitude, latitude from mapbox api
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}


module.exports = {
    geoCode
}