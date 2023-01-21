import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
