
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
