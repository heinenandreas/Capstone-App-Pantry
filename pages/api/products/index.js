import Product from "../../../schema/Product";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    switch (request.method) {
      case "GET":
        const products = await Product.find()
          .sort({ createdAt: -1 })
          .limit(100);
        response.status(200).json(products);
        break;

      case "POST":
        const createdProduct = await Product.create(request.body);
        response.status(200).json({ success: true, data: createdProduct });
        break;

      default:
        console.log("request method was neither GET or POST");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
