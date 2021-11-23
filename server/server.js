const express = require('express');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'finalProj';
const client = new MongoClient(url);

app.get("/data", (req, res) => {
     db.find({}, {}).toArray(function(e, r){
          if (e) throw e;
          res.status(200);
          res.append("Content-Type", "application/json");
          res.send(r);
     });
});


app.listen(port, () => {
     client.connect(function(err) {
          if (err) throw err;
          const db = client.db(dbName);
     });
     console.log(`App listening on port ${port}`)
});
