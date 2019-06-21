const EVENTS = require('../events');

module.exports.getMessage = (event, data) => {
    const { payload, extra = '' } = data;

    switch(event) {
        case EVENTS.LEVEL_UP:
            return `Has avanzado al nivel ${payload}!`;
        case EVENTS.NEW_FOLLOWER:
            return `${payload} ha comenzado a seguirte!`;
        case EVENTS.NEW_COMPETITION:
            return `${payload} te ha desafiado!`;
        case EVENTS.COMPETITION_WON:
            return `Le has ganado a ${payload} ${extra}!`;
        case EVENTS.COMPETITION_DRAW:
            return `Has empatado contra ${payload} ${extra}!`;
        case EVENTS.COMPETITION_LOST:
            return `${payload} te ha vencido ${extra}`;
        case EVENTS.NEW_CHALLENGE:
            return `${payload} ha agregado el desafío "${extra}"`;            
        default:
            return ``;            
    }
}