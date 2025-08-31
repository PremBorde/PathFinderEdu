const express = require("express");
const router = express.Router();
const ownerModel = require("../model/ownership-model");

if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req, res) => {
        try {
            const { fullName, email, password } = req.body;
            
            const owner = await ownerModel.create({
                fullName,
                email,
                password
            });
            
            res.status(201).json(owner);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}

router.get("/admin", async (req, res) => {
    try {
        res.status(200).send("HELLO OWNER");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//only for development

module.exports = router;