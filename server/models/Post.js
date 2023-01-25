import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    imageUrl: String,
    title: { type: String, required: true },
    tags: { type: Array, default: [] },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    date: { type: String },
    time: { type: String },
    viewsCount: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
