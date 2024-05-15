const redis = require('redis');

const redisHost = "127.0.0.1";
const redisClient = redis.createClient(6379, redisHost);

module.exports = redisClient;
