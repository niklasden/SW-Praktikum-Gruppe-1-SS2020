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
            method: ['DELETE'],
            response: '/response-files/products.json'
        }]
    }, 
    {
        params: '/products/top',
        requests: [{
            method: ['GET'],
            response: '/response-files/topArticles.json'
        }]
    },
    {
        params: '/products/shopped',
        requests: [{
            method: ['GET'],
            response: '/response-files/boughtProducts.json'
        }]
    },
    {
        params: '/groups',
        requests: [{
            method: ['GET'],
            response: '/response-files/groups.json'
        }],
    },
    {
        params: '/retailers',
        requests: [{
            method: ['GET'],
            response: '/response-files/retailers.json'
        }, 
        {
            method: ['POST'],
            response: '/response-files/createRetailer.json'
        }, 
        {
            method: ['DELETE'],
            response: '/response-files/createRetailer.json'
        }],
    },

    {
        params: '/retailers/top',
        requests: [{
            method: ['GET'],
            response: '/response-files/topRetailers.json'
        }],
    } ,
    {
        params: '/groupmembers/{email}',
        requests: [{
            method: 'GET',
            response: '/response-files/groupmembers.json'
        }],
    } ,
    {
        params: '/specificGroupMembers',
        requests: [{
            method: 'GET',
            response: '/response-files/SpecificGroupMembers.json'
        }],
    },
    ]
});

