/**
 * Created by Luke on 8/15/2015.
 */
var Task = require('../models/task');

module.exports = exports = function(server) {
    server.log("TaskRoute", "Task Routes Hit");

    exports.get(server);
    exports.post(server);
    exports.delete(server);
};

/**
 * Posts a new task to the database
 * @param server
 */
exports.post = function(server) {
    server.route({
        method: 'POST',
        path: '/tasks',
        handler: function(request, reply) {
            server.log("TaskRoute", "Creating task!");
            var newTask = new Task({author: request.payload.author, note: request.payload.message, completed: false});
            newTask.save(function(err, task) {
                if(err) {
                    throw err;
                } else {
                    reply("Task successfully created");
                }
            })
        }
    });
};

/**
 * Updates an element
 * @param server
 */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/tasks',
        handler: function(request, reply) {
            server.log("TaskRoute", "Updating task!");
        }
    });
};

/**
 * Deletes a task
 * @param server
 */
exports.delete = function(server) {
    server.route({
        method: 'DELETE',
        path: '/tasks',
        handler: function(request, reply) {
            server.log("TaskRoute", "Deleting task!");
        }
    });
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
            server.log("TaskRoute", "Sending all tasks!");
            Task.find(function(err, tasks) {
                reply(tasks);
            });
        }
    });
};