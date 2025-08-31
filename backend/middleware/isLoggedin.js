const jwt = require("jsonwebtoken");
const userModel = require("../model/user-module");

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "Please login to access this page");
        return res.redirect("/");
    }
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user = await userModel.findOne({email: decoded.user.email});
        req.user.select("-password");

        req.user = user;
        next();
    } catch (error) {
        req.flash("error", "Please login to access this page");
        res.redirect("/");
    }
};