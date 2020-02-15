const ModelResponses = require('../app/model/modelresponses');
const config = require('config');

const Error = ModelResponses.Error;

const jwt = require('jsonwebtoken')  
const fs = require('fs') 

const authorization = ((req, res, next) =>
{
    const authorization = req.headers['authorization']
    if (authorization === undefined) return res.status(401).send(new Error(401, "Unauthorized"))
    
    const token = req.headers['authorization'].split(' ')[1]
    if (token === undefined) return res.status(401).send(new Error(401, "Unauthorized"))
    
    const secretKey = config.get('secretKey')
    jwt.verify(token, secretKey, { algorithms: ['HS512'] }, function (error, decoded)
    {
        if (error) return res.status(401).send(new Error(401, "Unauthorized"))
        req.headers['user'] = decoded.user
        next()
    })
})

module.exports = authorization