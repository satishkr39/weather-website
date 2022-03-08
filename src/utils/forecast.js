// this file is to get the weather condition of a place
const request = require('request')

const forecast = (longitude, latitude, callback) => {
    // console.log(' forcase method called')

    const url = 'http://api.weatherstack.com/current?access_key=a0363848e9a8e08c3c14df2366ec8adb&query='+encodeURIComponent(longitude+','+latitude)
    // const url = 'http://api.weatherstack.com/current?access_key=a0363848e9a8e08c3c14df2366ec8adb&query=37.8267,-122.4233'
    // console.log(url)
    request({uri : url, json : true}, (error, response) =>{
        if(error){
            // calling the callback method with 2 arguments
            callback( 'Unable to connect ot weatherstack service!' ,undefined)
        }
        else if(response.body.error){
            // calling the callback method with 2 arguments
            callback('Please specify proper location', undefined)
        }
        else{
            // calling the callback method with 2 arguments and with proper data
            // console.log("The Weather is : ",response.body.current)
            // console.log( response.body.current)
            callback(undefined, response.body)
        }
    })

}

// exporting the module to app.js
module.exports = {
    forecast
}





