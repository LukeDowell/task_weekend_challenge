/**
 * Created by lukedowell on 8/15/15.
 */
var mongoose = require('mongoose');

var TaskSchema = {
    author: String,
    note: String,
    completed: Boolean
};

module.exports = mongoose.model('task', TaskSchema);