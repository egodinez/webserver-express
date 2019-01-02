const express = require('express');
const app = express();
const hbs = require('hbs');

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