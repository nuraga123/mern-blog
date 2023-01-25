import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: String,
    email: {
      type: String,
      require: true,
      index: true,
      unique: true,
      sparse: true,
    },
    date: String,
    time: String,
    passwordHush: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
