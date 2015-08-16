/**
 * Created by Luke on 8/15/2015.
 */
var Task = require('../models/task');

module.exports = exports = function(server) {
    server.log("TaskRoutes", "Task Routes Hit");

    exports.get(server);
};

/**
 * Retrieves all the tasks in our database and sends em back
 * @param server
 */
exports.get = function(server) {
    //Database test
    server.route({
        method: 'GET',
        path: '/tasks',
        handler: function(request, reply) {
            var task = new Task({message: "Some task", completed: false});
            task.save(function() {
                reply("Success");
            });
        }
    });
};