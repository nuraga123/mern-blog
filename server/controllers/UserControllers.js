import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // encrypt password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toString().slice(16, 21);
    // create user
    const doc = new UserModel({
      email: req.body.email,
      fullname: req.body.fullname,
      avatarUrl: req.body.avatarUrl,
      passwordHush: hash,
      date: date,
      time: time,
    });

    const user = await doc.save();

    // create token and 30 day term
    const token = jwt.sign({ _id: user._id }, "123", { expiresIn: "30d" });

    // change password to token
    const { passwordHush, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to register" });
  }
};

export const login = async (req, res) => {
  try {
    // search email user
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден !!!" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHush
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "логин и пароль не правельные !!!",
      });
    }

    const token = jwt.sign({ _id: user._id }, "123", { expiresIn: "30d" });

    const { passwordHush, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "не удалось авторизоваться" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "пользователь не найдень" });
    }

    const { passwordHush, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "failed to me" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const posts = await UserModel.find();
    res.json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось получить список пользователей",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;

    UserModel.findByIdAndDelete(
      {
        _id: userID,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(505).json({
            message: "не удалось удалить пользователь из remove 5",
          });
        }

        if (!doc) {
          return res.status(501).json({
            message: "не найдена пользователь DOC из getUsers 1",
          });
        }

        res.json({ seccess: "user delete URA !!!" });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "failed to me" });
  }
};
