var redis = require('redis').createClient()
var TimeSeries = require('../')
var ts = new TimeSeries(redis)
var key = process.argv[2]
var i = 0

redis.on("error", function(err) {
    console.log("Error: ", err)
})

var randomDelay = function() {
    return Math.floor(Math.random() * 15 * 100)
}

// Just increment the 'key' counter and wait
// some delay before trying again
setTimeout(function hit() {
    var amount = Math.random() * 1000
    ts.recordHit(key, null, amount)
        .exec(function() {
            console.log("Recorded hit [" + key + "]", ++i, new Date(), amount)
            setTimeout(hit, randomDelay())
        })
}, randomDelay())

// Just decrement the 'key' counter every once in a while
// with some delay to try again
// setTimeout(function removeHit() {
//     ts.removeHit(key)
//         .exec(function() {
//             console.log("Removed hit [" + key + "]", ++i, new Date());
//             setTimeout(removeHit, randomDelay() + 5000);
//         });
// }, randomDelay() + 5000);
