const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());
const port = 3000;

// Define tu API Key
const apiKey = '4GgYsz5FDfnk';

// Crea una función de middleware para verificar la API key
function verifyApiKey(req, res, next) {
    const providedApiKey = req.headers['api-key'];

    if (providedApiKey && providedApiKey === apiKey) {
        // La API key es válida
        next();
    } else {
        // La API key no es válida
        res.status(403).json({ error: 'Acceso no autorizado. API key inválida.' });
    }
}

// Agrega el middleware de verificación de API key a las rutas que deseas proteger
app.use('/students', verifyApiKey);

const pool = new Pool({
    user: 'default',
    host: 'ep-summer-hill-45014262-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: '4GgYsz5FDfnk',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

app.get('/students', function (req, res) {
    const listUsersQuery = `SELECT * FROM students`;

    pool.query(listUsersQuery)
        .then(data => {
            console.log("List students: ", data.rows);
            res.status(201).send(data.rows);
            // No uses pool.end() aquí, ya que cerraría la conexión para siempre
        })
        .catch(err => {
            console.error(err);
        });
});

app.get('/students/:id', function (req, res) {
    const listUsersQuery = `SELECT * FROM students WHERE id = ${req.params.id}`;

    pool.query(listUsersQuery)
        .then(data => {
            console.log("List students: ", data.rows);
            res.status(201).send(data.rows);
            // No uses pool.end() aquí, ya que cerraría la conexión para siempre
        })
        .catch(err => {
            console.error(err);
        });
});

app.post('/students', function (req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const notes = req.body.notes;
    const insertar = `INSERT INTO students(id, name, lastname, notes) VALUES(${id}, '${name}', '${lastname}', '${notes}')`;

    pool.query(insertar)
        .then(() => {
            res.status(201).send('students save');
        })
        .catch(err => {
            console.error(err);
        });
    console.log(req.body);
});

app.listen(port, function () {
    console.log(`the student server is working`);
});
