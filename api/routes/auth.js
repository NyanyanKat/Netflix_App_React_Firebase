const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    // password: bcrypt.hashSync(
    //   req.body.password,
    //   bcrypt.genSaltSync(Number(process.env.SALT))
    // ),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json("Error!! User already exists");
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong password or username!");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    // const passwordCheck = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password or username!");
    } else {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

      //destructure the password field, and the rest
      const { password, ...info } = user._doc;

      return res.status(200).json({ ...info, accessToken });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
