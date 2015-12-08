var express = require('express');
var router = express.Router();
var formatter = require('../lib/formatter.js');
var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://@localhost/peaksapp';

router.post('/', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO peaks(peak_name, range, rank, elevation, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6)',
      [req.body.data.attributes.peak_name,
      req.body.data.attributes.range,
      req.body.data.attributes.rank,
      req.body.data.attributes.elevation,
      req.body.data.attributes.latitude,
      req.body.data.attributes.longitude], function(err, result) {
      done();
      res.status(200).end();
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

router.get('/', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM peaks', function(err, result) {
      done();
      var url = req.get('host') + req.originalUrl;
      res.status(200).json(formatter.dataFormat(result.rows, url));
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
});

router.get('/ranges', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT DISTINCT range FROM peaks', function(err, result) {
      done();
      var url = req.get('host') + req.originalUrl;
      res.status(200).json(formatter.rangeFormat(result.rows, url));
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
});

router.get('/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM peaks WHERE id = $1', [req.params.id], function(err, result) {
      console.log(req.params.id)
      done();
      var url = req.get('host') + req.originalUrl;
      res.status(200).json(formatter.dataFormat(result.rows, url));
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
})

router.get('/ranges/:range', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM peaks WHERE range = $1', [req.params.range], function(err, result) {
      done();
      var url = req.get('host') + req.originalUrl;
      res.status(200).json(formatter.dataFormat(result.rows, url));
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
});

module.exports = router;