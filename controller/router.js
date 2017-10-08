const file = require('../models');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
module.exports.showIndex = function(req,res){
    file.getAllAlbums((allAlbums)=>{
        res.render('index',{
            'albums':allAlbums
        });
    });
};
module.exports.showAlbum = function(req,res){
    var albumName = req.params.albumName;
    file.getAllPhotos(albumName,(photos)=>{
        res.render('album',{
            'albumName':albumName,
            'photos': photos
        });
    });
};
module.exports.dopost = function(req,res){
    var form = new formidable.IncomingForm();
    var targetFile = path.join(__dirname,'../tempup');
    var final = path.join(__dirname,'../upload');
    form.uploadDir = targetFile;
    form.parse(req,function(err,fields,files){
        if(err){
            throw err;
        };
        var oldpath = files.picture.path;
        var newpath = path.join(final,fields.flodername,files.picture.name);
        fs.rename(oldpath,newpath,(err)=>{
            if(err) throw err;
            res.redirect('/'+fields.flodername);
        });
    });
};
module.exports.newfloder = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,file){
        if(err) throw err;
        var target = path.join(__dirname,'../upload',fields.flodername);
        fs.mkdir(target,(err)=>{
            if(err) throw err;
            res.send('1');
        });
    });
};
module.exports.rename = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,file){
        if(err) throw err;
        var oldpath = path.join(__dirname,'../upload',fields.oldname);
        var newpath = path.join(__dirname,'../upload',fields.newname);
        fs.rename(oldpath,newpath,(err)=>{
            if(err) throw err;
            res.send('1');
        });
    });
};
module.exports.deletefloder = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,file){
        if(err) throw err;
        var targetfloder = path.join(__dirname,'../upload',fields.flodername);
        fsExtra.remove(targetfloder,(err)=>{
            if(err) throw err;
            res.send('1');
        });
    });
};
module.exports.deleteimg = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,file){
        if(err) throw err;
        var img = path.basename(fields.imgsrc);
        var target = path.join(__dirname,'../upload',fields.flodername,img);
        fsExtra.remove(target,(err)=>{
            if(err) throw err;
            res.send('1');
        });
    });
};
