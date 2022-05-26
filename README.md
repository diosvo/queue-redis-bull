### STEP BY STEP

1. on Windows OS:

- connect to localhost:
  - remove params of `createClient` method in `redis.js` file.
  - open Virtual Machine or Ubuntu, run `redis-server`
  - open project's terminal, run `npm start`.
- connect to Redis Lab: run `npm start`.

  It's connected successfully only when the log shows "::> Redis Client Connected".

2. Open **Redis Insight** to see queues/ key-value pairs change.
3. Open [**Bull Dashboard**](http://localhost:3000/email/admin/queues) to see jobs lifecycle
