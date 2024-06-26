const kue = require('kue');

const queue = kue.createQueue();

const jobData = {
    phoneNumber: '',
    message: '',
  }

const job = queue.create('push_notification_code', jobData);
job.save((err) => {
  if (err) console.log(err);
  else console.log(`Notification job created: ${job.id}`);
});

job.on('completed', () => console.log('Notification job completed'));
job.on('failed', () => console.log('Notification job failed'));
