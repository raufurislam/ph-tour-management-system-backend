import { Schema } from "mongoose";
import { ITour } from "./tour.interface";

const tourSchema = new Schema<ITour>(
  {
    title: { type: String },
  },
  { timestamps: true }
);
