'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonBankBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup');

const prefix = "/shoppa"

module.exports = SetupEndpoint({
    name: 'shoppa',
    urls: [{
        params: '/products',
        requests: [{
            method: 'GET',
            response: '/response-files/products.json'
        },
        {
            method: ['POST'],
            response: '/response-files/products.json'
        }]
    }, {
        params: '/products/{id}',
        requests: [{
            method: ['GET'],
            response: '/response-files/products.json'
        }, {
            method: ['PUT'],
            response: '/response-files/products.json'
        }, {
            method: 'DELETE',
            response: '/response-files/products.json'
        }]
    }, {
        params: '/groups',
        requests: [{
            method: ['GET'],
            response: '/response-files/groups.json'
        }],
    } 
    ]
});

