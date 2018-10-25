var redis = require('redis')
var client = redis.createClient({ host: process.env.REDIS_HOST })
var { promisify } = require('util')

client.auth(process.env.REDIS_PWD)

exports.get = promisify(client.get).bind(client)

exports.hmset = promisify(client.hmset).bind(client)

exports.expire = promisify(client.expire).bind(client)