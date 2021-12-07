const express = require('express');
const fs = require('fs')
const cors = require('cors');
const { MongoClient } = require('mongodb')
const app = express();
app.use(cors());
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'finalProj';
const client = new MongoClient(url);

let collections = {
    all_homes: null,
    five_plus_bed: null,
    four_bed: null,
    one_bed: null,
    three_bed: null,
    two_bed: null,
};

let collectionsRental = {
    all_homes_rental: null,
    five_plus_bed_rental: null,
    four_bed_rental: null,
    one_bed_rental: null,
    three_bed_rental: null,
    two_bed_rental:null
};

app.get("/geojson", async (req, res) => {
     res.sendFile(__dirname + "/us-states.json")
})

app.get("/data", async (req, res) => {
    let results = {};
    let count = 0;

    // Projection to format the data for purchases
    for (const col in collections) {
        collections[col].aggregate( [
            { $project: { _id: 0, state: '$RegionName', data: {
                jan10: '$2010-01-31',
                feb10: '$2010-02-28',
                mar10: '$2010-03-31',
                apr10: '$2010-04-30',
                may10: '$2010-05-31',
                jun10: '$2010-06-30',
                jul10: '$2010-07-31',
                aug10: '$2010-08-31',
                sep10: '$2010-09-30',
                oct10: '$2010-10-31',
                nov10: '$2010-11-30',
                dec10: '$2010-12-31',
                jan11: '$2011-01-31',
                feb11: '$2011-03-31',
                mar11: '$2011-02-28',
                apr11: '$2011-04-30',
                may11: '$2011-05-31',
                jun11: '$2011-06-30',
                jul11: '$2011-07-31',
                aug11: '$2011-08-31',
                sep11: '$2011-09-30',
                oct11: '$2011-10-31',
                nov11: '$2011-11-30',
                dec11: '$2011-12-31',
                jan12: '$2012-01-31',
                feb12: '$2012-02-29',
                mar12: '$2012-03-31',
                apr12: '$2012-04-30',
                may12: '$2012-05-31',
                jun12: '$2012-06-30',
                jul12: '$2012-07-31',
                aug12: '$2012-08-31',
                sep12: '$2012-09-30',
                oct12: '$2012-10-31',
                nov12: '$2012-11-30',
                dec12: '$2012-12-31',
                jan13: '$2013-01-31',
                feb13: '$2013-02-28',
                mar13: '$2013-03-31',
                apr13: '$2013-04-30',
                may13: '$2013-05-31',
                jun13: '$2013-06-30',
                jul13: '$2013-07-31',
                aug13: '$2013-08-31',
                sep13: '$2013-09-30',
                oct13: '$2013-10-31',
                nov13: '$2013-11-30',
                dec13: '$2013-12-31',
                jan14: '$2014-01-31',
                feb14: '$2014-02-28',
                mar14: '$2014-03-31',
                apr14: '$2014-04-30',
                may14: '$2014-05-31',
                jun14: '$2014-06-30',
                jul14: '$2014-07-31',
                aug14: '$2014-08-31',
                sep14: '$2014-09-30',
                oct14: '$2014-10-31',
                nov14: '$2014-11-30',
                dec14: '$2014-12-31',
                jan15: '$2015-01-31',
                feb15: '$2015-02-28',
                mar15: '$2015-03-31',
                apr15: '$2015-04-30',
                may15: '$2015-05-31',
                jun15: '$2015-06-30',
                jul15: '$2015-07-31',
                aug15: '$2015-08-31',
                sep15: '$2015-09-30',
                oct15: '$2015-10-31',
                nov15: '$2015-11-30',
                dec15: '$2015-12-31',
                jan16: '$2016-01-31',
                feb16: '$2016-02-29',
                mar16: '$2016-03-31',
                apr16: '$2016-04-30',
                may16: '$2016-05-31',
                jun16: '$2016-06-30',
                jul16: '$2016-07-31',
                aug16: '$2016-08-31',
                sep16: '$2016-09-30',
                oct16: '$2016-10-31',
                nov16: '$2016-11-30',
                dec16: '$2016-12-31',
                jan17: '$2017-01-31',
                feb17: '$2017-02-28',
                mar17: '$2017-03-31',
                apr17: '$2017-04-30',
                may17: '$2017-05-31',
                jun17: '$2017-06-30',
                jul17: '$2017-07-31',
                aug17: '$2017-08-31',
                sep17: '$2017-09-30',
                oct17: '$2017-10-31',
                nov17: '$2017-11-30',
                dec17: '$2017-12-31',
                jan18: '$2018-01-31',
                feb18: '$2018-02-28',
                mar18: '$2018-03-31',
                apr18: '$2018-04-30',
                may18: '$2018-05-31',
                jun18: '$2018-06-30',
                jul18: '$2018-07-31',
                aug18: '$2018-08-31',
                sep18: '$2018-09-30',
                oct18: '$2018-10-31',
                nov18: '$2018-11-30',
                dec18: '$2018-12-31',
                jan19: '$2019-01-31',
                feb19: '$2019-02-28',
                mar19: '$2019-03-31',
                apr19: '$2019-04-30',
                may19: '$2019-05-31',
                jun19: '$2019-06-30',
                jul19: '$2019-07-31',
                aug19: '$2019-08-31',
                sep19: '$2019-09-30',
                oct19: '$2019-10-31',
                nov19: '$2019-11-30',
                dec19: '$2019-12-31'
            }}}
        ], {projection: {'_id': 0}}).toArray((e, r) => {
            if (e) throw e;
            results[col] = r;
            count++
        });
    }

    // Projection to format rental data
    for (const col in collectionsRental) {
        collectionsRental[col].aggregate( [
            { $project: { _id: 0, state: '$RegionName', data: {
                jan10: '$2010-01',
                feb10: '$2010-02',
                mar10: '$2010-03',
                apr10: '$2010-04',
                may10: '$2010-05',
                jun10: '$2010-06',
                jul10: '$2010-07',
                aug10: '$2010-08',
                sep10: '$2010-09',
                oct10: '$2010-10',
                nov10: '$2010-11',
                dec10: '$2010-12',
                jan11: '$2011-01',
                feb11: '$2011-02',
                mar11: '$2011-03',
                apr11: '$2011-04',
                may11: '$2011-05',
                jun11: '$2011-06',
                jul11: '$2011-07',
                aug11: '$2011-08',
                sep11: '$2011-09',
                oct11: '$2011-10',
                nov11: '$2011-11',
                dec11: '$2011-12',
                jan12: '$2012-01',
                feb12: '$2012-02',
                mar12: '$2012-03',
                apr12: '$2012-04',
                may12: '$2012-05',
                jun12: '$2012-06',
                jul12: '$2012-07',
                aug12: '$2012-08',
                sep12: '$2012-09',
                oct12: '$2012-10',
                nov12: '$2012-11',
                dec12: '$2012-12',
                jan13: '$2013-01',
                feb13: '$2013-02',
                mar13: '$2013-03',
                apr13: '$2013-04',
                may13: '$2013-05',
                jun13: '$2013-06',
                jul13: '$2013-07',
                aug13: '$2013-08',
                sep13: '$2013-09',
                oct13: '$2013-10',
                nov13: '$2013-11',
                dec13: '$2013-12',
                jan14: '$2014-01',
                feb14: '$2014-02',
                mar14: '$2014-03',
                apr14: '$2014-04',
                may14: '$2014-05',
                jun14: '$2014-06',
                jul14: '$2014-07',
                aug14: '$2014-08',
                sep14: '$2014-09',
                oct14: '$2014-10',
                nov14: '$2014-11',
                dec14: '$2014-12',
                jan15: '$2015-01',
                feb15: '$2015-02',
                mar15: '$2015-03',
                apr15: '$2015-04',
                may15: '$2015-05',
                jun15: '$2015-06',
                jul15: '$2015-07',
                aug15: '$2015-08',
                sep15: '$2015-09',
                oct15: '$2015-10',
                nov15: '$2015-11',
                dec15: '$2015-12',
                jan16: '$2016-01',
                feb16: '$2016-02',
                mar16: '$2016-03',
                apr16: '$2016-04',
                may16: '$2016-05',
                jun16: '$2016-06',
                jul16: '$2016-07',
                aug16: '$2016-08',
                sep16: '$2016-09',
                oct16: '$2016-10',
                nov16: '$2016-11',
                dec16: '$2016-12',
                jan17: '$2017-01',
                feb17: '$2017-02',
                mar17: '$2017-03',
                apr17: '$2017-04',
                may17: '$2017-05',
                jun17: '$2017-06',
                jul17: '$2017-07',
                aug17: '$2017-08',
                sep17: '$2017-09',
                oct17: '$2017-10',
                nov17: '$2017-11',
                dec17: '$2017-12',
                jan18: '$2018-01',
                feb18: '$2018-02',
                mar18: '$2018-03',
                apr18: '$2018-04',
                may18: '$2018-05',
                jun18: '$2018-06',
                jul18: '$2018-07',
                aug18: '$2018-08',
                sep18: '$2018-09',
                oct18: '$2018-10',
                nov18: '$2018-11',
                dec18: '$2018-12',
                jan19: '$2019-01',
                feb19: '$2019-02',
                mar19: '$2019-03',
                apr19: '$2019-04',
                may19: '$2019-05',
                jun19: '$2019-06',
                jul19: '$2019-07',
                aug19: '$2019-08',
                sep19: '$2019-09',
                oct19: '$2019-10',
                nov19: '$2019-11',
                dec19: '$2019-12'
            }}}
        ], {projection: {'_id': 0}}).toArray((e, r) => {
            if (e) throw e;
            results[col] = r;
            count++;

            // This ensures that the response is only sent after all the projections have finished.
            if (count === 12) {
                res.status(200);
                res.append('Context-Type', 'application/json');
                res.send(results);
            }
        });
    }
});


app.listen(port, () => {
     client.connect(function(err) {
          if (err) throw err;
          const db = client.db(dbName);
          for (const col in collections) {
              collections[col] = db.collection(col);
          }
          for (const col in collectionsRental) {
              collectionsRental[col] = db.collection(col);
          }
     });
     console.log(`App listening on port ${port}`)
});
