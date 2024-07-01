import { Document, model, models, Schema } from "mongoose";

export interface INotes extends Document {
  author: Schema.Types.ObjectId;
  views: number;
  content: string;
  isPrivate: boolean;
  lock?: {
    status: boolean;
    pin: string;
  };
  disableComments: boolean;
  authenticatedReaders: Schema.Types.ObjectId[];
  joinedAt: Date;
  replies: Schema.Types.ObjectId[];
}

const NotesSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  authenticatedReaders: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  content: {
    type: String,
    required: true,
  },
  disableComments: {
    type: Boolean,
  },
  views: {
    type: Number,
    default: 0,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  lock: {
    status: {
      type: Boolean,
    },
    pin: {
      type: Boolean,
    },
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
});

const Notes = models.Notes || model("Notes", NotesSchema);

export default Notes;
