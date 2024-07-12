const Comment = require("../models/Comments.Model");

module.exports = {
  createComment: async (req, res) => {
    try {
      const comment = await Comment.create({
        comment: req.body.comment
      });
      console.log("New comment added!");
      res.redirect(`/post/${req.params.id}`);
    }
    catch (err) {
      console.log('Comment could not be generated')
    }
  }
}
