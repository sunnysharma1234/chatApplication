const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ messgae: "All fileds are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password doess not match" });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "username already exits" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/${gender}?username=${userName}`;
    await User.create({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePhoto: maleProfilePhoto,
    });

    return res.status(201).json({
      message: "sccout created successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.status(400).json({ 
        message: "all fields is required" ,
        
      });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user is incoorect", sucsess: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "password i in correct", sucsess: false });
    }

    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,

        userName: user.userName,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
        message: "Login successfully",
        success:true
      });
  } catch (err) {
    // 
    console.log(err);
  }
}; 

const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    return res.status(200).json(otherUsers);
  } catch (err) {
    console.log(err);
  }
};

// module.exports = register;
// module.exports = login;
// module.exports = logout;
// module.exports = getOtherUsers;
module.exports = { register, login, logout, getOtherUsers };
