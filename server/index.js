import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import {
  UserController,
  PostController,
  CommentController,
} from "./controllers/index.js";

// отключение обновления
mongoose.set("strictQuery", false);
// подключение к базе данных
mongoose
  .connect(
    `mongodb+srv://admin:123@cluster0.0fnqqwk.mongodb.net/blog?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error =>", err.message));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("<h1>server is running</h1>");
});

// USER API
app.get("/auth/users", UserController.getUsers);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.delete("/auth/me/:id", UserController.deleteUser);

// upload APi
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// POST APi
app.get("/posts", PostController.getAll);
app.delete("/posts", PostController.removePostsAll);
app.get("/posts/popular", PostController.getAllPopular);

app.get("/posts/:id", PostController.getOne);
// POST/TAGS API
app.get("/tags", PostController.getLastTags);

// POST API and checkAuth
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

app.patch("/posts/:id", checkAuth, PostController.update);

app.delete("/posts/:id", checkAuth, PostController.remove);

// comments
app.post("/comment", checkAuth, CommentController.create);
app.get("/comment", checkAuth, CommentController.getComment);
app.delete("/comment", checkAuth, CommentController.removeCommentAll);

// server
app.listen(4444, (error) => {
  if (error) console.log("ERROR MESSAGE", error.message);
  console.log(`server ok`);
});
