import Post from "../models/post";
import User from "../models/user";
const { expressjwt: jwt } = require("express-jwt");

export const requireSignin = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params._id);
      // console.log("POST in EDITDELETEMIDDLEWARE => ", post);
      if(req.auth._id != post.postedBy) {
        return res.status(400).send("Não autorizado");
      } else {
        next();
      }
    } catch (error) {
      
    }
};

export const canDeleteUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params._id);
      // console.log("POST in EDITDELETEMIDDLEWARE => ", post);
      if(req.auth._id != user._id) {
        return res.status(400).send("Não autorizado");
      } else {
        next();
      }
    } catch (error) {
      
    }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    if (user.role !== "Admin") {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
