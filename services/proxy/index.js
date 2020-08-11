const express = require('express');
const conf = require('../../pkg/config');
var proxy = require('express-http-proxy');

const api = express();

api.use('/api/v1/auth', proxy(`localhost:${conf.get('service_ports').auth}/api/v1/auth`));
api.use('/api/v1/files', proxy(`localhost:${conf.get('service_ports').files}/api/v1/files`));
api.use('/api/v1/notes', proxy(`localhost:${conf.get('service_ports').notes}/api/v1/notes`));

api.listen(process.env.PORT || conf.get('service_ports').proxy, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`App started on port ${conf.get('service_ports').proxy}`);
});