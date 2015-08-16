/**
 * Created by Luke on 8/15/2015.
 */

module.exports = exports = function(server) {
    server.log("IndexRoute", "Index Routes Hit");

    exports.index(server);
    exports.assets(server);
    exports.vendors(server);
};

/**
 * Our index catch-all
 * @param server
 */
exports.index = function(server) {
    //Catch-all route
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: "assets/views"
            }
        }
    });
};

/**
 * Handles our local asset requests
 * @param server
 */
exports.assets = function(server) {
    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: function(request, reply) {
            reply.file('assets/' + request.params.param);
        }
    });
};

/**
 * Handles our vendor asset requests
 * @param server
 */
exports.vendors = function(server) {
    server.route({
        method: 'GET',
        path: '/vendors/{param*}',
        handler: function(request, reply) {
            reply.file("vendors/" + request.params.param);
        }
    });
};