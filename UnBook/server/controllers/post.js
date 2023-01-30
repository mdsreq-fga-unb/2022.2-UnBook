import Post from "../models/post.js";

export const createPost = async (req, res) => {
  // console.log("post => ", req.body);
  const { content } = req.body;
    if (!content.length) {
      return res.json({ error: "É necessário um conteúdo para ser publicado." });
    };
  try {
    const post = new Post({
      content,
      postedBy: req.auth._id,
    });
    post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
