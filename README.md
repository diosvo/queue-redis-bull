### STEP BY STEP

1. `yarn install`

2. if we use Windows OS:

- connect to localhost:
  - remove params of `createClient` method in `redis.js` file.
  - open Virtual Machine or Ubuntu, `redis-server`
  - open project's terminal, `npm start`
- connect to Redis Lab: `npm start`

  It's connected successfully only when the log shows "[redis] connected".

3. Open **Redis Insight** to see queues/ key-value pairs change.
4. Open [**Bull Dashboard**](http://localhost:3000/email/admin/queues) to see jobs lifecycle
