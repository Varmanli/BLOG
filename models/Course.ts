import { Schema, model, models, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  slug: string;
  description?: string;
  category?: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, trim: true },
    category: { type: String, default: "General" },
    coverImage: { type: String, trim: true },
  },
  { timestamps: true }
);

// Useful indexes
CourseSchema.index({ createdAt: -1 });

const Course = models.Course || model<ICourse>("Course", CourseSchema);
export default Course;
