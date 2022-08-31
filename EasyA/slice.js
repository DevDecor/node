var slice = (keys = [], obj)=>{
    var sliced = {};
    keys.forEach((e)=>{
        sliced[e] = obj[e];
    });
    return sliced;
}
// console.log(slice(['name'], {name: "olanrewaju", age: 19}))
module.exports = slice;