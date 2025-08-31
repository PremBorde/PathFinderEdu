const express = require("express");
const router = express.Router();
const userModel = require("../model/user-module");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    res.send("HELLO USER");
});

router.post("/register", async (req, res) => {
    try {
        console.log('Request body:', req.body);
        
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }

        const { fullName, email } = req.body;
        let { password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ 
                error: "Missing required fields",
                required: ["fullName", "email", "password"]
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        // Create user
        const user = await userModel.create({
            fullName,
            email,
            password
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                error: "Missing required fields",
                required: ["email", "password"]
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-jwt-secret-key',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}); 

module.exports = router;

