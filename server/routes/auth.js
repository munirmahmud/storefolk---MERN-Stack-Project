const { Router } = require("express");
const { createOrUpdateUser, currentUser} = require('../controllers/authControllers.js');

const express = require("express");

// Middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);


module.exports = router;