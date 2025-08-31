// Import required dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken"); 
const userModel = require("../model/user-module");

// Export controller methods
module.exports = {
    // Handle user registration
    register: async (req, res) => {
        try {
            // Log request body for debugging
            console.log('Request body:', req.body);
            
            // Validate request body exists
            if (!req.body) {
                return res.status(400).json({ error: "Request body is missing" });
            }

            // Extract user details from request body
            const { fullName, email } = req.body;
            let { password } = req.body;

            // Check if any required fields are missing
            if (!fullName || !email || !password) {
                return res.status(400).json({ 
                    error: "Missing required fields",
                    required: ["fullName", "email", "password"],
                    received: req.body
                });
            }

            // Check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    error: "User already exists",
                    message: "Please login instead of registering"
                });
            }

            // Hash password using bcrypt
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            // Create new user in database
            const user = await userModel.create({
                fullName,
                email,
                password
            });

            // Generate JWT token using utility function
            const token = generateToken(user);

            // Set secure HTTP-only cookie with token
            res.cookie("token", token, {
                httpOnly: true, // Prevents JavaScript access to cookie
                secure: true,   // Only sent over HTTPS
                maxAge: 3600000 // 1 hour in milliseconds
            });

            // Send success response with user details
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    fullName: user.fullName,
                    email: user.email
                }
            });

        } catch (error) {
            // Log error and return error response
            console.error('Error in /register:', error);
            res.status(500).json({ error: error.message });
        }
    }
};
