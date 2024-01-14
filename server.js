import pg from 'pg';
import config from './dbconfig.js';
import express from 'express';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







const pool = new pg.Pool(config);

// SET VARIABLES TO INSERT INTO TABLE
let name = 'bird';
let number = '300';

// START CONNECTION
const client = await pool.connect();

// INSERT INTO TABLE
// const text = 'INSERT INTO test_table(name, number) VALUES($1, $2)';
// const values = [name, number];
// const res = await client.query(text, values);
// console.log(res);

// DELETE FROM TABLE
// const text = 'DELETE FROM test_table WHERE name = $1';
// const values = [name];
// const res = await client.query(text, values);
// console.log(res);

// RETURN ALL ROWS
const res = await client.query('SELECT * FROM test_table');
console.log(res.rows);

// RELEASE CONNECTION
client.release();

// PRINT ROWS AND DECONSTRUCT OBJECTS
// function print_items(){
//     let res_name = res.rows[0]['name'];
//     let res_number = res.rows[0]['number'];
//     console.log(typeof(res_name));
//     console.log(typeof(res_number))
// }
// print_items();


