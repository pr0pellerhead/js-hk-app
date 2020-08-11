const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const db = require('../../pkg/db');
const conf = require('../../pkg/config');
const auth = require('./handlers/auth');

db.init();

const api = express();

api.use(bodyParser.json());
api.use(
    jwt({
        secret: conf.get('server').key,
        algorithms: ['HS256']
    }).unless({
        path: [
            { url: '/register', methods: ['POST'] },
            { url: '/login', methods: ['POST'] }
        ]
    })
);

api.post('/register', auth.register);
api.post('/login', auth.login);
api.get('/logout', auth.logout);
api.get('/refresh-token', auth.refresh);

api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

api.listen(conf.get('service_ports').auth, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`App started on port ${conf.get('service_ports').auth}`);
});
