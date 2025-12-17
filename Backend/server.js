// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet')

// const authRoutes = require('./Routes/authRoutes');
// const studRoutes = require(`./Routes/studentRoute`)

// const app = express();

// // app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(helmet());

// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api', studRoutes)

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./Routes/authRoutes");
const studRoutes = require("./Routes/studentRoute");

const app = express();

// ✅ Allowed origins (local + Render)
const allowedOrigins = [
  "http://localhost:3000",
  "https://studentdatatracker.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", studRoutes);

// ✅ Port from env (Render will inject PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
