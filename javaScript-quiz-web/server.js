const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;

app.get('/about', (req, res) => {
    res.send('This is about page');
});

app.get('/contact', (req, res) => {
    res.send('This is contact page');
});

app.post('/submit', (req, res) => {
    res.send('This is submission page');
});

app.use((req, res) => {
    res.status(404).send('This page does not exist');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
