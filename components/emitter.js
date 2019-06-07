const 
    notificationController = require('./notifications/controller'),
    userController = require('./users/controller'),
    emitter = require('events'),
    eventEmitter = new emitter.EventEmitter()
    EVENTS = require('./events');


eventEmitter.on(EVENTS.LEVEL_UP, data => { notificationController.addNotification(EVENTS.LEVEL_UP, data) });
eventEmitter.on(EVENTS.NEW_FOLLOWER, data => { notificationController.addNotification(EVENTS.NEW_FOLLOWER, data) });
eventEmitter.on(EVENTS.NEW_COMPETITION, data => { notificationController.addNotification(EVENTS.NEW_COMPETITION, data) });
eventEmitter.on(EVENTS.COMPETITION_WON, data => { 
    notificationController.addNotification(EVENTS.COMPETITION_WON, data); 
    userController.increaseCompetitionsWon(data.username);
});
eventEmitter.on(EVENTS.COMPETITION_DRAW, data => { notificationController.addNotification(EVENTS.COMPETITION_DRAW, data) });
eventEmitter.on(EVENTS.COMPETITION_LOST, data => { notificationController.addNotification(EVENTS.COMPETITION_LOST, data) });
eventEmitter.on(EVENTS.NEW_CHALLENGE, data => { notificationController.addNotification(EVENTS.NEW_CHALLENGE, data) });

module.exports = eventEmitter;