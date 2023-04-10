const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT, OPTIONS');
  next();
});




app.post('/api/anime', (req, res, data) => {
  const item = req.body;
  console.log(item);
  res.status(201).json({ message: 'Anime was added sucessfully' });
})

app.get("/api/anime", (req, res, next) => {
  const anime = [
    {
      id: 1,
      name: "Lorem",
    },
    {
      id: 2,
      name: "Ipsum",
    },
  ];
  res.status(200).json({ status: "Sucess", data: anime });
});

module.exports = app;
