const fs = require('fs');
const path = require('path');
module.exports.getAllAlbums = function(callback){
    var target = path.join(__dirname,"../upload");
    var allAlbums = [];
    fs.readdir(target,(err,files)=>{
        if(err) throw err;
        (function iterator(i){
            if(i == files.length){
                callback(allAlbums);
                return;
            };
            var filename = path.join(target,files[i]);//放在后面，否则报错！
            fs.stat(filename,(err,stats)=>{
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                };
                iterator(i+1);
            });
        })(0);
    })
};
module.exports.getAllPhotos = function(albumName,callback){
    var target = path.join(__dirname,"../upload",albumName);
    var allPhotos = [];
    fs.readdir(target,(err,files)=>{
        if(err){
            throw err;
        }; 
        (function iterator(i){
            if(i == files.length){
                callback(allPhotos);
                return;
            };
            var filename = path.join(target,files[i]);
            fs.stat(filename,(err,stats)=>{
                if(stats.isFile()){
                    allPhotos.push(files[i]);
                };
                iterator(i+1);
            });
        })(0);
    });
};
