const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("HELLO PRODUCT");
});

module.exports = router;