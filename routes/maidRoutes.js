const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Maid = require('../models/Maid');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  }
});
const upload = multer({ storage });

// LIST all maids
router.get('/', async (req, res) => {
  try {
    const maids = await Maid.find();
    res.render('index', { maids });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// SHOW form to add new maid
router.get('/new', (req, res) => {
  res.render('new');
});

// CREATE maid
router.post('/', upload.single('aadhaarFile'), async (req, res) => {
  try {
    const newMaid = new Maid({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      houseNumber: req.body.houseNumber,
      aadhaarFile: req.file.filename
    });
    await newMaid.save();
    res.redirect('/maids/success');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// SUCCESS PAGE
router.get('/success', (req, res) => {
  res.render('success');
});

// SHOW edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const maid = await Maid.findById(req.params.id);
    res.render('edit', { maid });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE maid
router.post('/:id', upload.single('aadhaarFile'), async (req, res) => {
  try {
    const upd = {
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      houseNumber: req.body.houseNumber
    };
    if (req.file) upd.aadhaarFile = req.file.filename;
    await Maid.findByIdAndUpdate(req.params.id, upd);
    res.redirect('/maids');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE maid
router.post('/:id/delete', async (req, res) => {
  try {
    await Maid.findByIdAndDelete(req.params.id);
    res.redirect('/maids');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
