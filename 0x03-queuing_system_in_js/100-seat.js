const redis = require('redis');
const express = require('express');
const util = require('util');
const kue = require('kue');

const app = express();
const queue = kue.createQueue();

/*
Redis
Create a Redic client:

Create a function reserveSeat, that will take into argument number, and set the key available_seats with the number
Create a function getCurrentAvailableSeats, it will return the current number of available seats (by using promisify for Redis)
When launching the application, set the number of available to 50
Initialize the boolean reservationEnabled to true - it will be turn to false when no seat will be available
Kue queue
Create a Kue queue
*/
const client  = redis.createClient();
const getAsync = util.promisify(client.get).bind(client);

const reserveSeat = (number) => {
	client.set('available_seats', number);
}

const getCurrentAvailableSeats = async () => {
	const val = await getAsync('available_seats')
	return val;
}

const reservationEnabled = true;
/*
Create an express server listening on the port 1245. (You will start it via: npm run dev 100-seat.js)

Add the route GET /available_seats that returns the number of seat available:
Add the route GET /reserve_seat that:

Returns { "status": "Reservation are blocked" } if reservationEnabled is false
Creates and queues a job in the queue reserve_seat:
Save the job and return:
{ "status": "Reservation in process" } if no error
Otherwise: { "status": "Reservation failed" }
--- When the job is completed, print in the console: Seat reservation job JOB_ID completed
When the job failed, print in the console: Seat reservation job JOB_ID failed: ERROR_MESSAGE

Add the route GET /process that:

Returns { "status": "Queue processing" } just after:
Process the queue reserve_seat (async):
Decrease the number of seat available by using getCurrentAvailableSeats and reserveSeat
If the new number of available seats is equal to 0, set reservationEnabled to false
If the new number of available seats is more or equal than 0, the job is successful
Otherwise, fail the job with an Error with the message Not enough seats available

Requirements:

Make sure to use promisify with Redis
Make sure to use the await/async keyword to get the value from Redis
Make sure the format returned by the web application is always JSON and not text
Make sure that only the allowed amount of seats can be reserved
Make sure that the main route is displaying the right number of seats
*/ 
app.get('/available_seats', (req, res) => {
	res.json({"numberOfAvailableSeats": getCurrentAvailableSeats(50)});
});

app.get('/reserve_seat', (req, res) => {
	if (!reservationEnabled) {
		res.send({ "status": "Reservation are blocked" });
	}
	else {
		job = queue('reserve_seat', (err) => {
			if(!err) {
				res.send({ "status": "Reservation in process" });
			} else {
				res.send({ "status": "Reservation failed" });
			}
		}).save();

		job.on('failed', (err) => {console.log(`Seat reservation job ${job.id} failed: ${err}`)});
		job.on('completed', () => {console.log(`Seat reservation job ${job.id} completed`)});
	}
	res.send('Hello World!');
})

app.get('/process', async (req, res) => {
	res.send({ "status": "Queue processing" });
	await queue.process('reserve_seat', async (job, done) => {
		const availableSeats = await getCurrentAvailableSeats();
		reserveSeat(availableSeats - 1);
		if (availableSeats - 1 === 0) {
			reservationEnabled = false;
		}
		done();	
	});
});

app.listen(1245, () => {
	console.log('listening on port 1245');
});
