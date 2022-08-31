let arr = [23, 345, 3454, 654, 454, 677, 656, 453, 234]

// console.log(arr.length)

for(i = 0; i<10; i++){
    console.log(i)
    // console.log("element in index "+i+' is '+arr[i])
    // document.getElementById('someId').innerHTML = i+'. '+arr[i]+'<br>';
}

// function find(arr){
//     let seq = arr;
    
//     arr.sort((a,b)=>a<b?-1:1);

//     var first = seq[1] - seq[0]

//     let second = seq[2] - seq[1]

//     let diff = first===second?first:seq[seq.length-1]-seq[seq.length-2]

//     for (let index = 1; index < seq.length; index++) {
//         if(seq[index]-(seq[index-1])!==diff){
//             return seq[index]-diff;
//         }
//     }
//     return 0;
// }

function find(arr){
    let seq = arr.sort((a, b)=>a<b?-1:1).slice(1).map((e, i)=>{
        return e-arr[i-1]
    });
    let In = 0;
    let interval = 0;
    [...new Set(seq)].reduce((v, i, x)=>{
        if(count(seq, i)==1){
            In = x;
            return i;
        }
        interval = i;
        return v
    })

    return arr[In+1]-interval;

    // seq.reduce((e, i)=>{
    //     if(seq.count(i)==1){
    //         return i;
    //     }
    //     return e;
    // })
}
function count(arr, element){
    let i =0;
    arr.reduce((a, e)=> {
        if(e==element){
            return ++a
        }
        return a
    });
}

let par = [5, -1, 0, 3, 4, -3, 2, -2]
console.log(find(par), par.sort((a,b)=>a<b?-1:0), -4-(-2));
// console.log(find([12, 14, 16, 20, 22]), (()=>{let name = [3, 342, 345,56, 53,434, 9].sort(); return name})());