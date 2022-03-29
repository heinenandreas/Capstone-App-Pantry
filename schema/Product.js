import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    text: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

export default model("Product", productSchema, "products", {
  overwriteModels: true,
});
