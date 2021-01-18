const { Router } = require("express");
const {createOrUpdateUser} = require('../controllers/authControllers.js');

const express = require("express");


const router = express.Router();

router.get('/create-or-update-user', createOrUpdateUser);

module.exports = router;