const express = require('express');
const path = require('path');

const app = express();

const isAdmin = false;

app.use((req, res, next) => {
    res.show = (name) => {
      res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
  });

app.use('/user', (req, res, next) => {
    if(isAdmin) next();
    else res.show('logIn.html');
  });

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.show('index.html')
});

app.get('/about', (req, res) => {
    res.show('about.html')
});

app.get('/home', (req, res) => {
    res.show('index.html')
});

app.use((req, res) => {
    res.status(404).show('notFound.html');
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});