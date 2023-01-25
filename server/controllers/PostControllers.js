import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toString().slice(16, 21);

    const doc = new PostModel({
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      tags: req.body.tags.split(","),
      text: req.body.text,
      user: req.userId,
      date: date,
      time: time,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось получить список статей",
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const name = req.params.id;
    const posts = await PostModel.findOne(
      {
        _id: name,
      },
      (err, doc) => {
        if (err) {
          console.log(err.message);

          return res.status(500).json({
            message: "не удалось вернуть статью из getTags",
          });
        }
        if (!doc) {
          return res.status(500).json({
            message: "не найдена статья DOC из getTags",
          });
        }
        res.json(doc);
      }
    );

    console.log(posts);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Не удалось получить список  getTags",
    });
  }
};

export const getAllPopular = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").sort({
      viewsCount: "desc",
    });

    res.json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось получить список популярных статей",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" },
      (err, doc) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "не удалось вернуть статью из getAll",
          });
        }

        if (!doc) {
          return res.status(500).json({
            message: "не найдена статья DOC из getAll",
          });
        }

        res.json(doc);
      }
    ).populate("user");
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось получить список статей",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
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

        res.json({ seccess: "delete post" });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось УДАЛИТЬ статью",
    });
  }
};

export const removePostsAll = async (req, res) => {
  try {
    PostModel.deleteMany((err, doc) => {
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

      res.json({ seccess: "delete posts all" });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось УДАЛИТЬ статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags.split(","),
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.json({
      message: "update post",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "problem update",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(2).exec();

    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log("getLastTags ERROR: ", error);
    res.status(403).json({
      message: "getLastTags error",
    });
  }
};
