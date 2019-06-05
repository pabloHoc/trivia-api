const 
    controller = require('./controller'),
    emitter = require('events'),
    eventEmitter = new emitter.EventEmitter()
    EVENTS = require('./events');


eventEmitter.on(EVENTS.LEVEL_UP, data => { controller.addNotification(EVENTS.LEVEL_UP, data) });
eventEmitter.on(EVENTS.NEW_FOLLOWER, data => { controller.addNotification(EVENTS.NEW_FOLLOWER, data) });
eventEmitter.on(EVENTS.NEW_COMPETITION, data => { controller.addNotification(EVENTS.NEW_COMPETITION, data) });
eventEmitter.on(EVENTS.COMPETITION_WON, data => { controller.addNotification(EVENTS.COMPETITION_WON, data) });
eventEmitter.on(EVENTS.COMPETITION_DRAW, data => { controller.addNotification(EVENTS.COMPETITION_DRAW, data) });
eventEmitter.on(EVENTS.COMPETITION_LOST, data => { controller.addNotification(EVENTS.COMPETITION_LOST, data) });
eventEmitter.on(EVENTS.NEW_CHALLENGE, data => { controller.addNotification(EVENTS.NEW_CHALLENGE, data) });

module.exports = eventEmitter;