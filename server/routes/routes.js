/**
 * Created by Luke on 8/15/2015.
 */
exports.init = function(server) {
    //Place all routes here, order doesn't matter as Hapi will sort them for us
    require('./tasks')(server);
    require('./index')(server);
};