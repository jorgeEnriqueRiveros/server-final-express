const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());
const port = 3000;

const pool = new Pool({
    user: 'default',
    host: 'ep-orange-smoke-08960365.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'bf3BTmnKYd4P',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});
    app.get('/students', function(req, res) {
    const listUsersQuery = `SELECT * FROM students`;

    pool.query(listUsersQuery)
    .then(data => {
        console.log("List students: ", data.rows);
        res.status(201).send(data.rows);
        pool.end();
    })
    .catch(err => {
        console.error(err);
        });
    });
    app.get ('students:id', function(req , res){
    const listUsersQuery = `SELECT * FROM students WHERE = id ${req.params.id}`
    pool.query(listUsersQuery)
    .then(data => {
        console.log("List students: ", data.rows);
        res.status(201).send(data.rows);
        pool.end();
    })
    .catch(err => {
        console.error(err);
        });
    });
    
    app.post('/students', function(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const notes = req.body.notes;
    const insertar =`INSERT INTO students(id, name, lastname, notes) VALUES(${id}, '${name}', '${lastname}', '${notes}')`
    pool.query(insertar)
    .then(() => {
        res.status(201).send('students save');
    })
    .catch(err =>{
        console.error(err)
    })        
    console.log(req.body);
    });
app.listen(port, function() {
    console.log(`the student server is working`);
   });