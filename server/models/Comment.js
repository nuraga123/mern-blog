import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: String,
    comment: String,
    date: { type: String },
    time: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
