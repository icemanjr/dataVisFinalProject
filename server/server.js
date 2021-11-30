const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb')
const app = express();
app.use(cors());
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'finalProj';
const client = new MongoClient(url);

app.get("/data", async (req, res) => {
     await client.connect();
     const db = client.db(dbName);
     const collections = [
         "all_homes",
         "all_homes_rental",
         "five_plus_bed",
         "five_plus_bed_rental",
         "four_bed",
         "four_bed_rental",
         "one_bed",
         "one_bed_rental",
         "three_bed",
         "three_bed_rental",
         "two_bed",
         "two_bed_rental"

     ]
     const results = [];
     for (const col in collections){
          const collection = db.collection("all_homes");
          const result = await collection.find({}).toArray();
          results.push(result)
     }
     client.close();
     res.send(results)
});


app.listen(port, () => {
     client.connect(function(err) {
          if (err) throw err;
          const db = client.db(dbName);
     });
     console.log(`App listening on port ${port}`)
});
