var comma = (digit)=>{
    var formatter =  new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN'
    });
    return formatter.format(digit)
}
var db = require('./fdb');
var home = new db('home');
home.change('set', {}, {id: Math.random()*9999999});