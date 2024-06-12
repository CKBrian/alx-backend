import {createClient} from 'redis';
const redis = require('redis');
const util = require('util');

const client = createClient();

const hgetAllAsync = util.promisify(client.hgetall).bind(client);

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
  client.quit();
});

client.on('connect', () => console.log('Redis client connected to the server'));

client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'Paris', 2, redis.print);

/**
 * Asynchronously retrieves all the fields and values of a hash stored in Redis.
 *
 * @param {string} schoolName - The name of the hash to retrieve.
 * @return {Promise} A Promise that resolves to an object containing the fields and values of the hash, or null if the hash does not exist.
 * @throws {Error} If there is an error retrieving the hash from Redis.
 */
async function displaySchoolValue(schoolName) {
  try {
    // Retrieve all the fields and values of the hash from Redis.
    const data = await hgetAllAsync(schoolName);
    
    // If the hash exists, log its contents to the console.
    if (data) console.log(data);
  } catch (err) {
    // If there is an error retrieving the hash from Redis, log the error to the console.
    console.log(err);
  }
}

displaySchoolValue('HolbertonSchools');
