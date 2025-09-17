import { Schema, model, models } from "mongoose";

export interface IMessage {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "ایمیل معتبر نیست"],
    },
    message: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

const Message = models.Message || model<IMessage>("Message", messageSchema);

export default Message;
