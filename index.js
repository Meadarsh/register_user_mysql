import express from 'express';
import mysql from 'mysql';

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user:"root",
  database: 'testt',
});

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }

  console.log('Connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.send('Connected to MySQL database');
});
app.post('/register', (req, res) => {
   
    const { name, email,number, password } = req.body;
  
   const insertQuery = 'INSERT INTO user (name, email, number, password) VALUES (?, ?, ?)';
  
   connection.query(insertQuery, [name, email, number, password], (error, results) => {
    if (error) {
      console.error('Error inserting data: ' + error.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
      console.log('Inserted ID:', results.insertId);
      res.status(201).send('User registered successfully');
    });
  });

  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
