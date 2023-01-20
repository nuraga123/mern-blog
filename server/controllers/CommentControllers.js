import CommentModel from "../models/Comment.js";

export const create = async (req, res) => {
  try {
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toString().slice(16, 21);
    console.log(date);
    const docComment = new CommentModel({
      comment: req.body.comment,
      user: req.userId,
      date: date,
      time: time,
    });

    const comment = await docComment.save();
    res.json(comment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось создать комментарий create",
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate("user").exec();

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получит комментарии getComment",
    });
  }
};

export const removeCommentAll = async (req, res) => {
  try {
    CommentModel.deleteMany((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(505).json({
          message: "не удалось удалить статью из remove 5",
        });
      }

      if (!doc) {
        return res.status(501).json({
          message: "не найдена статья DOC из getAll 1",
        });
      }

      res.json({ seccess: "delete comments all" });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось УДАЛИТЬ статью",
    });
  }
};
