const mongoose = require('mongoose');
const Event = require('../models/Event');

const _eventProjection = 'title location groupSize eventType price purpose description viewPublic editable';

module.exports.getEvents = (req, res) => {
    Event.find({}, _eventProjection, (err, events) => {
        let eventsArr = [];
        if (err) {
            return res.status(500).send({message: err.message});
        }
        if (events) {
            events.forEach(event => {
                eventsArr.push(event);
            });
        }
        res.send(eventsArr);
    });
}

module.exports.create = (req, res) => {
    
}

