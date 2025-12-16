// // server.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { Pool } = require('pg');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Your PostgreSQL connection string
// });

// // Signup Route
// app.post('/api/auth/signup', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
//       [email, hashedPassword]
//     );
//     res.status(201).json({ message: 'User created', user: result.rows[0] });
//   } catch (err) {
//     if (err.code === '23505') { // Unique violation error code
//       res.status(400).json({ error: 'Email already exists' });
//     } else {
//       res.status(500).json({ error: err.message });
//     }
//   }
// });

// // Login Route
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userResult = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
//     if (userResult.rowCount === 0) return res.status(400).json({ error: 'Invalid credentials' });

//     const user = userResult.rows[0];
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

//     // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1min' });
//     // res.json({ token, userId: user.id, email: user.email });
//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1min' }
//     );
//     res.json({ token, userId: user.id, email: user.email });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet')

const authRoutes = require('./Routes/authRoutes');
const studRoutes = require(`./Routes/studentRoute`)

const app = express();

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', studRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
