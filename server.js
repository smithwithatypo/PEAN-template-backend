import pg from 'pg';
import config from './dbconfig.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


// CONNECT
const pool = new pg.Pool(config);



// not needed (delete later)
// const db = await pool.connect();
// db.release();



async function insert(pool, name, number){
    const text = 'INSERT INTO test_table(name, number) VALUES($1, $2)';
    const values = [name, number];
    const res = await pool.query(text, values);
    return res;
}


async function deleteRow(pool, name){    
    const text = 'DELETE FROM test_table WHERE name = $1';
    const values = [name];
    const res = await pool.query(text, values);
    return res;
}



async function get_all(pool){
    const res = await pool.query('SELECT * FROM test_table');
    return res.rows;
}


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const table_results = await get_all(pool); 
//   console.log(table_results);  // for debugging
  res.send(table_results);
})

app.post('/insert', async (req, res) => {
    // console.log(req.body);  // for debugging
    let name = req.body.name;
    let number = req.body.number;

    let db_result = await insert(pool, name, number);
    console.log("rows added:", db_result["rowCount"]);

    res.send({'message': `added ${name}, ${number} to table`})
})

app.post('/delete', async (req, res) => {
    console.log(req.body);
    let name = req.body.name;

    let db_result = await deleteRow(pool, name);
    console.log("rows deleted: ", db_result["rowCount"]);

    res.send({'message': `deleted ${name} from table`})
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})






// CONNECT
// const pool = new pg.Pool(config);

// SET VARIABLES TO INSERT INTO TABLE
// let name = 'bird';
// let number = '300';

// START CONNECTION
// const db = await pool.connect();

// INSERT INTO TABLE
// const text = 'INSERT INTO test_table(name, number) VALUES($1, $2)';
// const values = [name, number];
// const res = await db.query(text, values);
// console.log(res);

// DELETE FROM TABLE
// const text = 'DELETE FROM test_table WHERE name = $1';
// const values = [name];
// const res = await db.query(text, values);
// console.log(res);

// RETURN ALL ROWS
// const res = await db.query('SELECT * FROM test_table');
// console.log(res.rows);

// RELEASE CONNECTION
// db.release();



