/*
In a file named 8-job.js, create a function named createPushNotificationsJobs:

It takes into argument jobs (array of objects), and queue (Kue queue)
If jobs is not an array, it should throw an Error with message: Jobs is not an array
For each job in jobs, create a job in the queue push_notification_code_3
When a job is created, it should log to the console Notification job created: JOB_ID
When a job is complete, it should log to the console Notification job JOB_ID completed
When a job is failed, it should log to the console Notification job JOB_ID failed: ERROR
When a job is making progress, it should log to the console Notification job JOB_ID PERCENT% complete
*/
const createPushNotificationsJobs = (jobs, queue) => {
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array');
    }
    jobs.forEach( (job) => {
        const qjob = queue.create('push_notification_code_3', job).save( (err) => {
            if (!err) {
                console.log(`Notification job created: ${qjob.id}`);
            }
        });
        qjob.on('failed', (err) => {
            if (err && qjob.id) {
                console.log(`Notification job ${qjob.id} failed: ${err}`);
            }
        })
        .on('progress', (progress) => {
            if (progress && qjob.id) {
                console.log(`Notification job ${qjob.id} ${progress}% completed`);
            }
        })
        .on('complete', () => {
            if (qjob.id) {
                console.log(`Notification job ${qjob.id} completed`);
            }
        });
    });
}

module.exports = createPushNotificationsJobs;
