const BgGray = "\x1b[100m%s\x1b[0m";
const BgGreen = '\x1b[102m%s\x1b[0m';
const BgRed = '\x1b[41m%s\x1b[0m';

const PREFIX = '[queue]';

const handlerCompleted = (job) => {
  console.info(BgGreen, PREFIX, `job in ${job.queue.name} completed for ${job.id}`);
}

const handlerFailure = (job, error) => {
  if (job.attemptsMade >= job.opts.attempts) {
    console.info(
      BgRed,
      PREFIX,
      `job failures above threshold in ${job.queue.name} for ${job.id} \n\terror: ${error.message}`
    );
    return null;
  }

  console.info(
    BgRed,
    PREFIX,
    `job in ${job.queue.name} failed for ${job.id}
    error: ${error.message}. 
    attempts left: ${job.opts.attempts - job.attemptsMade}
    `
  );
}

const handlerStalled = (job) => {
  console.info(
    BgGray,
    PREFIX,
    `job in ${job.queue.name} stalled for ${job.id}`
  );
}

module.exports = { handlerCompleted, handlerFailure, handlerStalled }