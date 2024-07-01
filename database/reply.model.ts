import { Document, model, models, Schema } from "mongoose";

export interface IReply extends Document {
  author: Schema.Types.ObjectId;
  noteId: Schema.Types.ObjectId;
  content: String;
  joinedAt: Date;
}

const ReplySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  noteId: {
    type: Schema.Types.ObjectId,
    ref: "Notes",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Reply = models.Reply || model("Reply", ReplySchema);

export default Reply;
