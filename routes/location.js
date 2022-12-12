var express = require('express');
var XMLHttpRequest = require('xhr2');
var router = express.Router();

lightsLocations = [{ "latitude": 43.602049, "longitude": 1.454338, "id":4 },{ "latitude": 43.59716580319137, "longitude": 1.4600135524428226, "id":0 }];

router.post('/', function (req, res, next) {
    
    if (req.body.latitude != null || req.body.latitude != "") {
        latitude = req.body.latitude;
        longitude = req.body.longitude;

        nearbyLights = getNearbyLights(latitude, longitude);

        console.log(nearbyLights);

        nearbyLights.forEach(light => {
            console.log(light);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://192.168.221.28/" + light.id + "/on", true);
            xhr.send();
        });

        res.send(nearbyLights);
    }else{
        res.status(500).send("Location missing in body.")
    }
    
});

function getNearbyLights(latitude, longitude) {
    var nearbyLights = [];
    for (var i = 0; i < lightsLocations.length; i++){
        var dist = distance(latitude, longitude, lightsLocations[i].latitude, lightsLocations[i].longitude, "K");
        if(distance(latitude, longitude, lightsLocations[i].latitude, lightsLocations[i].longitude, "K")*1000 < 100){
            nearbyLights.push(lightsLocations[i]);
        }
    }
    return nearbyLights;
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

module.exports = router;