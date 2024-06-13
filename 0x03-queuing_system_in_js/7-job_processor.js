const blacklisted = ['4153518780', '4153518781'];
const kue = require('kue');
const queue = kue.createQueue();

const sendNotification = (phoneNumber, message, job, done) => {
    job.progress(0, 100);
    
    if (blacklisted.includes(phoneNumber)) {
        return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }

    setTimeout(() => {
        job.progress(50, 100);
        console.log(`Notification sent to ${phoneNumber}, with message: ${message}`);
        done();
    }, 1000);
}

queue.process('push_notification_code_2', 2, (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
