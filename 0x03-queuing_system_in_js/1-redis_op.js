import { createClient } from 'redis';
const redis = require('redis');

const client = createClient();

client.on('error', err => console.log(`Redis client not connected to the server: ${err}`))

client.on('ready', () => 'Redis client connected to the server');

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
}

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, data) => {
    if (err) throw err;
    if (data) console.log(`${data}`);
  });
}

const getSetData = () => {
  displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  displaySchoolValue('HolbertonSanFrancisco');

}
getSetData();
