import bcrypt from "bcrypt";
import mongoose, { CallbackError, Document, Model, Schema } from "mongoose";
import { Roles } from "./types";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Roles;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "researcher", "partner"],
      default: "researcher",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error as CallbackError);
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
