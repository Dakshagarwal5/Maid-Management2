const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const maidRoutes = require('./routes/maidRoutes');
const connectDB = require('./config/db'); // MongoDB connection
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => res.render('home')); // Homepage
app.use('/maids', maidRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/maids`));
