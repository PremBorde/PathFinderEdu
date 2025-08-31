// Import required dependencies
const express = require("express");
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");

// Home route - renders index page with any flash error messages
router.get("/", isLoggedin, (req, res) => {
    let error = req.flash("error");
    res.render("index", {error});
});

// Shop route - renders shop page for logged in users
router.get("/shop", isLoggedin, (req, res) => {
    res.render("shop");
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

// Export router for use in main app
module.exports = router;