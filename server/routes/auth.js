const { Router } = require("express");
const express = require("express");

const router = express.Router();

router.get('/create-or-update-user', (req, res) => {
    res.json({
        data: "Hello, this is new router"
    });
});

module.exports = router;