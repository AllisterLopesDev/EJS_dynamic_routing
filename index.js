const express = require('express');
const fs = require('fs')
const path = require('path');
const app = express();
const port = 3000;

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// setup ejs as view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render('index', {files: files});
    })
})

app.get('/file/:fileName', (req, res) => {
    fs.readFile(`./files/${req.params.fileName}`, 'utf-8', (err, fileData) => {
        res.render('show', {fileName: req.params.fileName, fileData: fileData})
    })
})

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.desc, (err) => {
        res.redirect('/');
    });
});

app.listen(port, () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
    }
})