const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 8080;

// Log environment variables for debugging
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };

  // const dbConfig = {
  //   host: 'localhost',   // container name of db, default Localhost, since port is mapped to host
  //   port: 3307,          // Host port mapped to container's 3306
  //   user: 'root',        // Default root user
  //   password: 'root',    // From MYSQL_ROOT_PASSWORD
  //   database: 'my_app'    // Default database; change if you create a custom one
  // };

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/api/students', async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM Students');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      if (connection) await connection.end();
    }
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});