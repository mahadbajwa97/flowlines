
var DataStore = require('./dataStore');
var Boom = require('boom');

Object.getFlowbyId = function (request, reply) {
    var flowID = request.params.flowID;
    DataStore.Object.getFlowsByID(function (err, results) {
        if (err) {
            return reply(Boom.badImplementation(err.details[0].message));
        }
        reply(results[0][0]);
    });
}