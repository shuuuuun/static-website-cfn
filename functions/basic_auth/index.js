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
        requestLog('OK', request);
        callback(null, request);
        return;
    }

    if (userAgents && allowUAs.includes(userAgents[0].value)) {
        requestLog('OK', request);
        callback(null, request);
        return;
    }

    if (authorization) {
        const enc = authorization[0].value.split(' ')[1];
        const userPassword = new Buffer(enc, 'base64').toString();

        for (let key in allowPasswd) {
            let val = allowPasswd[key];
            if (`${key}:${val}` === userPassword) {
                requestLog('OK', request);
                callback(null, request);
                return;
            }
        }
    }

    const response = {
        status: '401',
        statusDescription: 'Authorization Required',
        httpVersion: request.httpVersion,
        headers: {
            'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic realm="Enter username and password."' }],
            'content-type': [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
        },
        body: '401 Authorization Required',
    };
    requestLog('NG', request);
    callback(null, response);
};

function requestLog(message, request) {
    const headers = request.headers;
    const userAgents = headers['user-agent'];
    const authorization = headers.authorization || headers.Authorization;
    const format = {
        message,
        clientIp: request.clientIp,
        requestUri: request.uri,
        authorization,
        referer: headers.referer,
        userAgents,
        pragma: headers.pragma,
    };
    console.log(JSON.stringify(format));
}
