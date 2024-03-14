const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '#whiteknight28',
    database: 'nmsql' // Specify the database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log("Database Connected");
});

const app = express();

app.use(express.json())

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nmsql';// Corrected SQL query
    db.query(sql, err => {
        if (err) {
            console.error('Database creation error:', err);
            res.sendStatus(403);
            return;
        }
        res.send("Database created");
    });
});

app.post('/createtb', (req, res) => {
    let sql = `CREATE TABLE products (
        id INT PRIMARY KEY,
        name VARCHAR(255),
        price INT,
        manufacture_ID VARCHAR(10),
        stock INT
    )`;// Corrected SQL query
    db.query(sql, err => {
        if (err) {
            console.error('Database creation error:', err);
            res.sendStatus(403);
            return;
        }
        res.send("Table created");
    });
});

app.get('/selectdb', (req, res) => {
    let sql = "SELECT * FROM electronics"  // Corrected SQL query
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database showing error:', err);
            res.sendStatus(403);
            return;
        }
        console.log("results")
        res.json({msg: "result", body: results})
    });
});

app.post('/insertdb', (req, res) => {
    let sql = `INSERT INTO electronics
    (id, name, price, manufacture_ID, stock)
    VALUES
    (2, 'Smartphone', 599.99, LPAD(FLOOR(RAND() * 10000000000), 10, '0'), 50),
    (3, 'Laptop', 999.99, LPAD(FLOOR(RAND() * 10000000000), 10, '0'), 30),
    (4, 'Headphones', 79.99, LPAD(FLOOR(RAND() * 10000000000), 10, '0'), 100),
    (5, 'Tablet', 299.99, LPAD(FLOOR(RAND() * 10000000000), 10, '0'), 20),
    (6, 'Smartwatch', 199.99, LPAD(FLOOR(RAND() * 10000000000), 10, '0'), 10);`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Table Insertion error:', err);
            res.sendStatus(403);
            return;
        }
        console.log("results")
        res.json({msg: "result", body: results})
    });
});

app.delete('/deletedb:id', (req, res) => {
    let sql = `DELETE FROM electronics WHERE id = ${req.params.id}`  // Corrected SQL query
    db.query(sql,err => {
        if (err) {
            console.error('Database creation error:', err);
            res.sendStatus(403);
            return;
        }
        console.log("results")
        res.json({msg: "result", body: "record is deleted"})
    });
});

app.put('/updatedb:id', (req, res) => {
    console.log(req.body)
    let updateFields = `name='${req.body.name}', price=${parseInt(req.body.price)}, manufacture_ID='${req.body.manufacture_ID}', stock=${parseInt(req.body.stock)}`
    
    let sql = `UPDATE electronics SET ${updateFields} WHERE id = ${req.params.id}`;  // Corrected SQL query
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database creation error:', err);
            res.sendStatus(403);
            return;
        }
        console.log("results")
        res.json({msg: "result", body: results})
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
