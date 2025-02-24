import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    bookId: { type: String, required: true }, // Store as string to match Sequelize book IDs
    rating: { type: Number, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
