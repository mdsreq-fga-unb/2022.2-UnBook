const { expressjwt: jwt } = require("express-jwt");
import Post from "../models/post";

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
