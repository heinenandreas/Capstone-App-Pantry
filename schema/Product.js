import { Schema, model } from "mongoose";
import "./User";

const productSchema = new Schema(
  {
    productName: { type: String, required: true, minlength: 3 },
    unit: { type: String, required: true, minlength: 3 },
    category: { type: String, required: true, minlength: 3 },
    minAmount: { type: Number, required: true },
    actualAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Product", productSchema, "products", {
  overwriteModels: true,
});
