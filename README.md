### Set up

1. `yarn install`

2. if we use Windows OS:

- connect to localhost:
  - remove params of `createClient` method in `redis.js` file.
  - open Virtual Machine or Ubuntu, `redis-server`
  - open project's terminal, `npm start`
- connect to Redis Lab: `npm start`

It's connected successfully only when the log shows "[redis] connected".

### Dashboard

| View           | URL                         | Note                           |
| -------------- | --------------------------- | ------------------------------ |
| Redis          | RedisInsight application    | queues/ key-value pairs change |
| Bull Dashboard | {{host}}/email/admin/queues | jobs lifecycle                 |
| Swagger Docs   | {{host}}/swagger-docs/      | APIs development               |
