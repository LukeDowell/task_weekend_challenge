/**
 * Created by Luke on 8/15/2015.
 */
exports.init = function(server) {
    require('./tasks')(server);
    require('./index')(server);
};