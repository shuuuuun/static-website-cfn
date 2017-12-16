'use strict';

const ipRangeCheck = require('ip-range-check');
const allowIPs = require('./allow-ips');
const allowUAs = require('./allow-uas');
const allowPasswd = require('./allow-passwd');

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const userAgents = headers['user-agent'];

    const authorization = headers.authorization || headers.Authorization;

    if (ipRangeCheck(request.clientIp, allowIPs)) {
        console.log('OK', request.clientIp, request.uri, authorization, headers.referer, userAgents, headers.pragma);
        callback(null, request);
        return;
    }

    if (userAgents && allowUAs.includes(userAgents[0].value)) {
        console.log('OK', request.clientIp, request.uri, authorization, headers.referer, userAgents, headers.pragma);
        callback(null, request);
        return;
    }

    if (authorization) {
        const enc = authorization[0].value.split(' ')[1];
        const userPassword = new Buffer(enc, 'base64').toString();

        for (let key in allowPasswd) {
            let val = allowPasswd[key];
            if (`${key}:${val}` === userPassword) {
                console.log('OK', request.clientIp, request.uri, authorization, headers.referer, userAgents, headers.pragma);
                callback(null, request);
                return;
            }
        }
    }

    console.log('NG', request.clientIp, request.uri, authorization, headers.referer, userAgents, headers.pragma);

    const response = {
        status: '401',
        statusDescription: 'Authorization Required',
        httpVersion: request.httpVersion,
        headers: {
            'www-authenticate': [{key:'WWW-Authenticate', value: 'Basic realm="Enter username and password."'}],
            'content-type': [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
        },
        body: '401 Authorization Required',
    };

    callback(null, response);
};
