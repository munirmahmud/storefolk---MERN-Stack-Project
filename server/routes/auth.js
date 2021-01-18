const { Router } = require("express");
const {createOrUpdateUser} = require('../controllers/authControllers.js');

const express = require("express");

// Middlewares
const { authCheck } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;