import mongoose, { now } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String },

    email: {
      type: String,
      require: true,
      index: true,
      unique: true,
      sparse: true,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    passwordHush: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },

  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
