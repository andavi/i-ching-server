const express = require('express')
const server = express();
const port = 4000;
const unirest = require('unirest');
const mongoClient = require('mongodb').MongoClient

// /////////////////////////////////////////////
// RapidAPI Code
// ////////////////////////////////////////////

server.get('/', (req, res) => {
    res.send('Hello World!')
  });

server.post('/api', (req, res) => {

    var request = unirest("POST", "https://japerk-text-processing.p.rapidapi.com/sentiment/");
    
    request.headers({
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "japerk-text-processing.p.rapidapi.com",
        "useQueryString": true
    });
    
    request.form({
        "text": "Hello, world!",  // || req.body.text
        "language": "english"
    });
    
    
    request.end(function (response) {
        if (response.error) throw new Error(response.error);
    
        console.log(response.body);
        // res.send(response.body || '');
    });
})

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// MonngoDB Connection
// /////////////////////////////////////////////////

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://iching-mdb:${process.env.MONGODB_PW}@cluster0.ofizn.mongodb.net/ichingdb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// /////////////////////////////////////////////////
// /////////////////////////////////////////////////


// create basic server and implement handling different requests

server.listen(port, function(){
    console.log(`listening on http://localhost:${port}`);
});