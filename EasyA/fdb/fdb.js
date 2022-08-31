var fs = require('fs');
var has = require('./equal');
var slice = require("./slice.js");
var {EventEmitter} = require('events');
class db extends EventEmitter{
    name;
	dir = 'db/';
    fileName;
    content;
    doc;
    constructor(name, dir='db/'){
		///$/.test(dir)?log('hello');
		//dir[dir.length-1] === '/'? this.dir = dir : this.dir = dir+'/';
		super();
        this.name = name;
        this.fileName = name[name.length-4]==='.' ? name : name+".fdb";
        if(!fs.existsSync('./'+this.dir+this.fileName) && !fs.existSync(this.dir)){
			fs.mkdir(this.dir, (err)=>{return err})
            fs.writeFileSync(this.dir+this.fileName, "¿§", (err)=>{
				console.log('error creating database', err);
			});
        }
    }
    changeDir(dir){
		dir[dir.length-1] === '/'? this.dir = dir : this.dir = dir+'/';
		fs.rename('db/',this.dir, (err)=>{});
    }
	changeName(name){
		fs.rename(this.dir+this.fileName, name+'.fdb', (err)=>{})
		this.name = name;
	}
    add(data, callback = null){
		if(callback){
			this.on('saveError', ()=>{ 
				callback('unable to save the document \n check your file system module(fs)');
			})
		}
        if(Object.keys(data).length){
            fs.appendFileSync(this.dir+this.fileName, JSON.stringify(data), (err)=>{
				if(err){this.emit('saveError')}
			});
            fs.appendFileSync(this.dir+this.fileName, "¿§", (err)=>{this.emit('saveError')});
        }
    }
    fetch(spec={}, query = {}, logic = 0, skip = 0, limit=0){
        this.content = fs.readFileSync('./'+this.dir+this.fileName, ()=>{});
        this.doc = this.content.toString().split('¿§').filter(el=>{
			return el != '';
		}).map((doc)=>{
			return JSON.parse(doc);
		});
		if(Object.keys(query).length){
			this.doc = this.doc.filter((x)=>{
				var e = false;
				if(logic){
					return has(query, x);
				}else{
					for(let y of Object.keys(query)){
						if(x[y] === query[y]){
							return true;
							break;
						}
					}
					return false;
				}
			});
		}
		if(limit){
			return this.doc.splice(skip, limit);
		}else{
			return this.doc;
		}
	}
	remove(doc={}){
		var c = [];
		this.doc = this.fetch().filter((z)=>{
			if(has(doc, z)){
				c.push(z);
				return false;
			}else{
				return true;
			}
		});
		fs.writeFileSync(this.dir+this.fileName, "¿§", (err)=>{
			console.log('error creating database', err);
		});
		this.doc.forEach((d)=>{this.add(d)});
		return c;
	}
	drop(){
		fs.unlinkSync(this.dir+this.fileName, (err)=>{})
	}
  change(change, query, object){
		 var arr = [];
    var newest = this.fetch().map((e)=>{
      if(has(query, e)){
        arr.push(e);
			   if(change === "set"){
          Object.keys(object).forEach((a)=>{
            e[a]=object[a];
					  })
          return e;
        }else if(change === 'add'){
          Object.keys(object).forEach((a)=>{
            e[a]+=object[a];
					  })
						return e;
        }else{
          return new Error('changw type not specified');
				 }
      }
      return e;
    });
    fs.writeFileSync(this.dir+this.fileName, "¿§", (err)=>{
		  	console.log('error creating database', err);
		 });
    newest.forEach((o)=>{
      this.add(o);
    });
		 return arr;
  }
}
var test = new db('users');
// test.add({name: 'all is here'})
// test.change('set', {}, {joinDate: Date.now()})
// console.log(test.fetch())
// var newOne = new db();
module.exports = db;