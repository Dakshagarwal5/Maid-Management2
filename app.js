const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const maidRoutes = require('./routes/maidRoutes');
const connectDB = require('./config/db');
const serveIndex = require('serve-index');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE — Static Files (important: comes BEFORE routes)
app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARE — Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => res.render('home'));
app.use('/maids', maidRoutes);

// UPLOADS (if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// After uploads static
app.use('/uploads', serveIndex(path.join(__dirname, 'uploads')));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
