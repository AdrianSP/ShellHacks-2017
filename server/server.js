// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Table      = require('./app/models/table.js');
var port 	   = process.env.PORT || 8080;        // set our port


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
       
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.route('/tables')
	.get(function(req, res) {
        Table.find(function(err, table) {
            if (err)
                res.send(err);

            res.json(table);
        });
	})

	.post(function(req, res) {
		console.log(req.body)
		var table = new Table(req.body);

		table.save(function(err) {
            if(err)
            	res.send(err);
            res.json({ message: 'Table created!' });
        });
	});

	router.route('/tables/:table_id')
    // get the table with that id (accessed at GET http://localhost:8080/api/tables/:table_id)
    .get(function(req, res) {
        Table.findById(req.params.table_id, function(err, table) {
            if (err)
                res.send(err);
            res.json(table);
        });
    })


        // update the table with this id (accessed at PUT http://localhost:8080/api/tables/:table_id)
    .put(function(req, res) {
        Table.findById(req.params.table_id, function(err, table) {
            if (err)
                res.send(err);

            table.name = req.body.name;
            table.capacity = req.body.capacity;
            table.occupancy = req.body.capacity;

            table.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Table updated!' });
            });

        });
    })

        // delete the table with this id (accessed at DELETE http://localhost:8080/api/tables/:table_id)
    .delete(function(req, res) {
        Table.remove({
            _id: req.params.table_id
        }, function(err, table) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
// console.log('Magic happens on port ' + port);