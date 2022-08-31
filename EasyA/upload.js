var multer = require('multer');
var storage = (Path, Prefix ='', Suffix='')=>{
  return multer.diskStorage({

    destination: function (req, file, cb) {

      cb(null, Path)

    },

    filename: function (req, file, cb) {
      var fileNameArr = file.originalname.split('.');
      fileExt = fileNameArr.splice(fileNameArr.length-1, 1);
      cb(null, Prefix+fileNameArr.join('.').replace(' ', '-').toUpperCase()+Suffix+'.'+fileExt);
    }
  })
}
// var upload = multer({storage('uploads')});
module.exports = {storage};