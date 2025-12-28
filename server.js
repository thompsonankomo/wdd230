const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'chamber-secret-key', resave: false, saveUninitialized: true }));
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
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    )`, () => {
      // Insert default admin user
      db.run(`INSERT OR IGNORE INTO users (email, password, role) VALUES ('admin@chamber.com', 'adminpass', 'admin')`);
    });
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

// Authentication routes
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, password, 'user'], function(err) {
    if (err) {
      console.error('Error registering user:', err.message);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.json({ message: 'Registered successfully' });
  });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) {
      console.error('Error querying user:', err.message);
      return res.status(500).send('Server error');
    }
    if (row) {
      req.session.user = { id: row.id, email: row.email, role: row.role };
      res.json({ message: 'Signed in successfully', user: req.session.user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

app.post('/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not sign out');
    }
    res.json({ message: 'Signed out successfully' });
  });
});

app.get('/user', (req, res) => {
  res.json(req.session.user || null);
});

app.get('/applications', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  db.all('SELECT * FROM applications', [], (err, rows) => {
    if (err) {
      console.error('Error fetching applications:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});