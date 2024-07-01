// import { hash, compare, genSalt, setRandomFallback } from "bcryptjs-react";
import { compare, genSalt, hash } from "bcryptjs";
import { model, models, Schema, Document, Model } from "mongoose";
// import isaac from "isaac";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  salt: string;
  sessionToken: string;
  profilePic?: string;
  joinedAt: Date;
  description: string;
}

export interface UserMethods {
  isValidPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser, Model<IUser, {}, UserMethods>>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  sessionToken: {
    type: String,
    select: false,
  },
  profilePic: { type: String },
  joinedAt: { type: Date, default: Date.now() },
  description: { type: String, required: false },
});

UserSchema.pre("save", async function (next) {
  // setRandomFallback((len) => {
  //   return isaac.random(len);
  // });
  const salt = await genSalt(10);
  const hashPassword = await hash(this.password, salt);

  console.log(salt, hash);
  this.password = hashPassword;

  next();
});

UserSchema.method(
  "isValidPassword",
  async function (password: string): Promise<boolean> {
    const isValid = await compare(password, this.password);

    return isValid;
  }
);

const User =
  models?.User ||
  model<IUser, Model<IUser, {}, UserMethods>>("User", UserSchema);

export default User;
