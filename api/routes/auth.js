const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

//! register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json("A new user Created successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

//! login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(403).json("Invalid password!");
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error); // 500 Internal Server Error durumunda genel bir hata mesajı gönderilir
    }
});



module.exports = router;