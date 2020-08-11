const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const config = require('../../pkg/config');
const db = require('../../pkg/db');
const handlers = require('./handlers/notes');

db.init();

let api = express();

api.use(bodyParser.json());
api.use(
    jwt({
        secret: config.get('server').key,
        algorithms: ['HS256']
    })
);

api.get('/', handlers.getAllNotes);
api.get('/:id', handlers.getOneNote);
api.post('/', handlers.createNote);
api.put('/:id', handlers.updateNote);
api.patch('/:id/pin', handlers.pinNote);
api.patch('/:id/share', handlers.shareNote);
api.delete('/:id', handlers.deleteNote);
api.get('/search', handlers.searchNotes);

api.listen(config.get('service_ports').notes, err => {
    if (err) {
        return console.error(err);
    }
    console.log('Service successfully started on port', config.get('service_ports').notes);
});