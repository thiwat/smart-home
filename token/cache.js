const redis = require('redis')
const client = redis.createClient({ host: process.env.REDIS_HOST })
const { promisify } = require('util')

client.auth(process.env.REDIS_PWD)

exports.get = promisify(client.get).bind(client)

exports.hmset = promisify(client.hmset).bind(client)

exports.expire = promisify(client.expire).bind(client)