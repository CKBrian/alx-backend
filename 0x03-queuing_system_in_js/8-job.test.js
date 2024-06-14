const queue = require('kue').createQueue()
const expect = require('chai').expect
const createPushNotificationsJobs = require('./8-job');


const jobs = [
  {
    PhoneNumber: '+254-712345678',
    message: 'This job is present'
  },
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  }
];

before(() => {queue.testMode.enter();});
after(() => {queue.testMode.exit();});
afterEach(() => {queue.testMode.clear();})

it('should display jobs in an array', async () => {
  await createPushNotificationsJobs(jobs, queue);
  expect(queue.testMode.jobs).to.deep.equal(jobs);
  expect(queue.testMode.jobs.length).to.equal(2)
});
it('should display an error if jobs is not an array', async () => {
  try {
    await createPushNotificationsJobs('not an array', queue); // Pass a non-array here
    expect.fail('Expected an error to be thrown');
  } catch (error) {
    expect(error.message).to.equal('Jobs is not an array');
  }
  // Check the length of jobs in the queue
  expect(queue.testMode.jobs.length).to.equal(0);
});


