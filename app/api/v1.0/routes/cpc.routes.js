module.exports = (app) =>
{
    const cpc = require('../controllers/cpc.controller');
    const authorization = require('../../../../config/authorize')
    const environment = require('../../../../environments/environment');

    const vapi = environment.v1;

    app.get(vapi + '/palindrome/:word', cpc.palindrome)

    app.get(vapi + '/group/:word', cpc.groupCharacters)

    app.get(vapi + '/possible/:word', cpc.possibleString)
    
    app.get(vapi + '/sum/:word', cpc.sumOfN)
}