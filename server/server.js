/**
 * Created by Luke on 8/14/2015.
 */
var hapi = require('hapi');
var good = require('good');
var inert = require('inert');
var path = require('path');
var mongoose = require('mongoose');
var Task = require('./models/task');

//Connect to our database
var mongoURI = "mongodb://localhost/task_database";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err) {
    if(err) {
        console.log("ლ(ಠ益ಠლ) - DAT ERR: " + err);
    }
});

mongoDB.once('open', function() {
    console.log('(⌐■_■)CONNECTED TO MONGO(⌐■_■)');
});

//Creates a hapi server
var server = new hapi.Server({
    connections: {
        routes: {
            files: {
                //All future pathing will be relative to this url
                relativeTo: path.join(__dirname, "public")
            }
        }
    }
});

//Connection information
server.connection({
    host: 'localhost',
    port: (process.env.PORT || 5000)
});

//Register good and inert
server.register([
    {
        register: good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    },
    {
        register: inert

    }
], function() {

    //Starts our server
    //We do this in here in case a plugin takes a long time to register
    server.start(function(err) {
        if(err) throw err;
        server.log("Info", "Server starting on port: " + server.info.uri);
    });
});

//Database test
server.route({
    method: 'GET',
    path: '/database',
    handler: function(request, reply) {
        var task = new Task({message: "Some task", completed: false});
        task.save(function() {
            reply("Success");
        });
    }
});

//Assets
server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: function(request, reply) {
        console.log(request.params.param);
        reply.file('assets/' + request.params.param);
    }
});

//Vendor
server.route({
    method: 'GET',
    path: '/vendors/{param*}',
    handler: function(request, reply) {
        console.log(request.params.param);
        reply.file("vendors/" + request.params.param);
    }
});

//Catch-all route
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: "assets/views",
            index: true,
            listing: true
        }
    }
});
