const redis = require('redis');
const express = require('express');
const util = require('util');
const kue = require('kue');

const app = express();
const queue = kue.createQueue();

/*
Redis
Creates a Redis client:
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
reserveSeat(50);

/*
Creates an express server listening on the port 1245.
Add the route GET /available_seats that returns the number of seat available:
Add the route GET /reserve_seat that creates queue jobs for seat reservation:
*/
app.get('/available_seats', async (req, res) => {
	res.json({"numberOfAvailableSeats": await getCurrentAvailableSeats()});
});

app.get('/reserve_seat', async (req, res) => {
	if (!reservationEnabled) {
		res.json({ "status": "Reservation are blocked" });
	}
	else {
		const job = queue.create('reserve_seat', { "numberOfAvailableSeats": await getCurrentAvailableSeats() }).save((err) => {
			if(!err) {
				res.json({ "status": "Reservation in process" });
			} else {
				res.json({ "status": "Reservation failed" });
			}
		});
		console.log(' queue creation did not fail: ' + job.id);
		job.on('failed', (err) => {
			console.log(`Seat reservation job ${job.id} failed: ${err}`)
		});
		job.on('complete', () => {
			console.log(`Seat reservation job ${job.id} completed`);
		});
	}

});
/*
Route GET /process that:

Returns { "status": "Queue processing" } just after:
Process the queue reserve_seat (async):
Decrease the number of seat available by using getCurrentAvailableSeats and reserveSeat
If the new number of available seats is equal to 0, set reservationEnabled to false
If the new number of available seats is more or equal than 0, the job is successful
Otherwise, fail the job with an Error with the message Not enough seats available
*/
app.get('/process', async (req, res) => {
	res.json({ "status": "Queue processing" });
	queue.process('reserve_seat', async (job, done) => {
		const availableSeats = await getCurrentAvailableSeats();
		reserveSeat(availableSeats - 1);
		if (availableSeats - 1 === 0) {
			reservationEnabled = false;
		} else if (availableSeats - 1 > 0) {
			done();
		} else {
		done(new Error('Not enough seats available'));
		}	
	});
});

app.listen(1245, () => {
	console.log('listening on port 1245');
});
