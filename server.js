const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express()


// -REGISTER PARTIALS AND HBS(TEMPLATE) SETTING
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// -CREATING LOG FILE
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        
        if (err) {
            console.log('unable to append to server.log.')
        }
    });
    next();
});


// -MEINTANCE PAGE
/*app.use((req, res, next) => {
    
    res.render('maintenance.hbs');
    
});*/


// -PUBLIC STATIC SITE
app.use(express.static(__dirname + '/public'));


// -HELPER CURRENT YEAR
hbs.registerHelper('getCurrentYear', () => {
    
   return new Date().getFullYear() 
});


// -HELPER UPPERCASE
hbs.registerHelper('screamIt', (text) => {
    
    return text.toUpperCase();
});


// -HOME PAGE SITE
app.get('/', (req, res) => {
    
    res.render('home.hbs', {
        
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome this is a render page',
    });
});


// -ABOUT SITE
app.get('/about', (req, res) => {
    
    res.render('about.hbs', {
        
        pageTitle: 'About Page',
        shortMessage: 'Hej, hej, may may..',
    });
});


// -PROJECT SITE
app.get('/project', (req, res) => {
    
    res.render('project.hbs', {
        
        pageTitle: 'Project page',
        shortMessage: 'This is some project page',
        someText: 'Projects will be listed here',
    });
});


// -SITE FOR ERROR(JSON)
app.get('/bad', (req, res) => {
    
    res.send({
        
     errorMessage: 'Critical error',
     errorDesctription: [
         
         'Unable to read',
         'Unable to update',
         'Unable to delete'
     ]
        
    });    
});


// -APP LISTEN
app.listen(port, () => {
    
    console.log(`Server is up on port ${port}`);
});