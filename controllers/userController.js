import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    // Remove the password field before sending the response
    const { password: _, ...userWithoutPassword } = user._doc;

    res.json({ success: true, token, user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET);
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking if user is already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, user: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getUser = async (req, res) => {
  try{
    const exists = await userModel.findById({_id: req.params.id }).select("-password");
    if (!exists) {
      return res.json({ success: false, message: "User Not exists" });
    }
    return res.json({ success: true , user: exists });
  }catch(error){
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// const logoutUser = async ( req, res ) => {
//   try{

//   }catch(error){

//   }
// }

export { loginUser, registerUser, getUser };
