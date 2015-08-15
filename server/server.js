/**
 * Created by Luke on 8/14/2015.
 */
var hapi = require('hapi');
var good = require('good');
var inert = require('inert');
var path = require('path');

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

var dbOpts = {
    url: "mongodb://localhost/task_database"
};

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

    },
    {
        register: require('hapi-mongodb'),
        options: dbOpts
    }
], function(err) {
    //Starts our server
    server.start(function(err) {
        if(err) throw err;
        server.log("Info", "Server starting on port: " + server.info.uri);
    });
});

//Connection information
server.connection({
    host: 'localhost',
    port: (process.env.PORT || 5000)
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
