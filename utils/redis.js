#!/usr/bin/node

const { promisify } = require('util');
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(err);
    });
    this.success = false;
    this.client.on('connect', () => {
      this.success = true;
    });
  }

  isAlive() {
    return this.success;
  }

  async get(key) {
    const asyncGet = promisify(this.client.get).bind(this.client);
    const val = await asyncGet(key);
    return val;
  }

  async set(key, val, dur) {
    const asyncSet = promisify(this.client.get).bind(this.client);
    const val = await asyncSet(key, val, 'EX', dur);
  }

  async del(key) {
    const asyncDel = promisify(this.client.del).bind(this.client);
    await asyncDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
