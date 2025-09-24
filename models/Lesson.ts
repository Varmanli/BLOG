import { Schema, model, models, Document, Types } from "mongoose";

export interface ILesson extends Document {
  course: Types.ObjectId;
  title: string;
  slug: string;
  content: string | any;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: Schema.Types.Mixed, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Useful indexes
LessonSchema.index({ course: 1, order: 1 });

const Lesson = models.Lesson || model<ILesson>("Lesson", LessonSchema);
export default Lesson;
