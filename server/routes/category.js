const express = require('express');
const router = express.Router();

// Middleware
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// Controllers
const { create, read, update, remove, list } = require('../controllers/categoryController');

// Routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;