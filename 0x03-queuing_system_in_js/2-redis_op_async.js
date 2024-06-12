import { createClient } from 'redis';
const redis = require('redis');
const util = require('util');

const client = createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
  client.quit();
});

client.on('connect', () => console.log('Redis client connected to the server'));

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
}

/*promisify get method*/
const getAsync = util.promisify(client.get).bind(client);

const displaySchoolValue = async (schoolName) => {
  try {
    const data = await getAsync (schoolName);
	console.log(`${data}`);
  } catch (err) {
    console.log(err);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
