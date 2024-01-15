## Summary

A backend template for an app using PostgreSQL, Express, Angular, Node.

## How to use

- set up a PostgreSQL server in a Docker container using this tutorial: https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/
- make your own **dbconfig.js** file with these specs (change your username, password, and database name):

```
const config = {
    user: 'username',
    host: 'localhost',
    database: 'db_name',
    password: 'pw_here',
    port: 5432,
}
export default config;
```

- start your server with this command:

```
$ node server.js
```

- your frontend will send HTTP requests to port 3000.
- your backend will send SQL queries to port 5432.
