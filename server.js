const express = require('express');
const app = express();
const hbs = require('hbs');

const https = require('https');
const fs = require('fs');
var streams = require('memory-streams');



app.set('view engine', 'hbs');

require('./hbc/helpers');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'eric godinez hErrera'
    });
});

app.get('/about', (req, res) => {

    res.render('about');
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port}`);
});



app.get('/convert', function(req, res, next) {
    // download the file via aws s3 here
    let company = req.query.company;
    let fileID = req.query.file;
    //643cf68b-fc7f-4028-8680-3646024542fd.mp3
    //http://localhost:3000/s3.mp3?company=sugar&file=643cf68b-fc7f-4028-8680-3646024542fd.mp3
    //https: //s3-us-west-2.amazonaws.com/serpico-whoisapp/sugar/643cf68b-fc7f-4028-8680-3646024542fd.mp3
    //C:\\Users\\erig3\\Desktop\\node\\06-webserver\\

    let filePath = `${ __dirname }\\file.mp3`;
    console.log(filePath);
    const file = fs.createWriteStream(filePath);
    const request = https.get(`https://s3-us-west-2.amazonaws.com/serpico-whoisapp/${ company }/${ fileID }`, function(response) {

        response.pipe(file);

        file.on('finish', function() {
            //file.close(cb);
            res.sendFile(filePath);
        });

        //res.sendFile('./public/assets/file.mp3');

        //res.setHeader('Content-disposition', `attachment; filename=file.mp3`);
    });


});




/*

//res.write(file);
    //res.end();

    var process = new ffmpeg("C:\\Users\\erig3\\Desktop\\node\\06-webserver\\file.mp3");
    process.then(function(audio) {

        audio.fnExtractSoundToMP3("C:\\Users\\erig3\\Desktop\\node\\06-webserver\\file2.mp3", (err, file) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File: ' + file);
            }
        });
    });
    */






/*
var fileKey = req.query['fileKey'];

console.log('Trying to download file', fileKey);
var AWS = require('aws-sdk');
AWS.config.update(
  {
    accessKeyId: "....",
    secretAccessKey: "...",
    region: 'ap-southeast-1'
  }
);
var s3 = new AWS.S3();
var options = {
    Bucket    : '/bucket-url',
    Key    : fileKey,
};

res.attachment(fileKey);
var fileStream = s3.getObject(options).createReadStream();
fileStream.pipe(res);*/