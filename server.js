const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'chamber'))); // Serve static files from chamber folder

// Database setup
const db = new sqlite3.Database('./chamber.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fname TEXT NOT NULL,
      lname TEXT NOT NULL,
      phone TEXT,
      email TEXT NOT NULL,
      url TEXT,
      audience TEXT,
      warehouse TEXT,
      operations TEXT,
      stock TEXT,
      marketing TEXT,
      completeDate TEXT,
      business TEXT,
      partners INTEGER
    )`);
  }
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chamber', 'index.html'));
});

app.post('/join', (req, res) => {
  const {
    fname, lname, phone, email, url, audience,
    warehouse, operations, stock, marketing,
    completeDate, Business: business, partners
  } = req.body;

  const sql = `INSERT INTO applications (fname, lname, phone, email, url, audience, warehouse, operations, stock, marketing, completeDate, business, partners)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [fname, lname, phone, email, url, audience, warehouse, operations, stock, marketing, completeDate, business, partners];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      res.status(500).send('Error saving application');
    } else {
      console.log(`Application submitted with ID: ${this.lastID}`);
      res.redirect('/thanks.html');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});