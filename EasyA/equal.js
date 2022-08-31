function has(a, b){
    return Object.keys(a).every((x)=>{
        return a[x]===b[x];
    });
}
// console.log(has({name: 'hello'}, {name: 'hello'}));
module.exports = has;