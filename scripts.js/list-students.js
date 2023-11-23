const { Pool } = require('pg');

const pool = new Pool({
    user: 'default',
    host: 'ep-summer-hill-45014262-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: '4GgYsz5FDfnk',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});


const listUsersQuery = `SELECT * FROM students;`;

pool.query(listUsersQuery)
    .then(res => {
        console.log("List students: ", res.rows);
        pool.end();
    })
    .catch(err => {
        console.error(err);
        pool.end();
    });