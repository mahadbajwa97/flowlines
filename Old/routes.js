
var Joi = require('joi');
var Handlers = require('./handlers');

var routes = {
    path: '/flows/{ID}',
    method: 'GET',
    handler: Handlers.getFlowsByID,
    config: {
        validate: {
            params: {
                ID: Joi.number().integer().min(1)
            }
        }
    }
};