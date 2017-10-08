const express = require('express');
const app = express();
app.set('view engine','ejs');
const router = require('./controller');
const path = require('path');
var target1 = path.join(__dirname,'./public');
var target2 = path.join(__dirname,'./upload');
app.use(express.static(target1));
app.use(express.static(target2));
app.listen(3000,'127.0.0.1');
app.get('/',router.showIndex);
app.get('/:albumName',router.showAlbum);
app.post('/newfloder',router.newfloder);
app.post('/rename',router.rename);
app.post('/deletefloder',router.deletefloder);
app.post('/uploadImg',router.dopost);
app.post('/deleteimg',router.deleteimg);
//404
app.use(function (req, res) {
    res.render("err");
});