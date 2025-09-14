import { Schema, model, models, Document, Types } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string | any;
  author?: string;
  tags?: string[];
  category: Types.ObjectId;
  coverImage?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: Schema.Types.Mixed, required: true },
    author: { type: String, default: "ناشناس" },
    tags: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    coverImage: { type: String },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
export default Blog;
 