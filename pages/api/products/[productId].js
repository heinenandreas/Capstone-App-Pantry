import Product from "../../../schema/Product";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  const { productId } = request.query;

  try {
    connectDb();

    switch (request.method) {
      case "GET":
        // get the correct joke
        const product = await Product.findById(productId);
        if (product) {
          response.status(200).json(product);
        } else {
          response.status(404).json({ error: "Not found" });
        }
        break;

      case "PATCH":
        // patch the correct joke
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        );
        if (updatedProduct) {
          response.status(200).json({
            success: true,
            data: updatedProduct,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }

        break;

      case "DELETE":
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (deletedProduct) {
          response.status(200).json({
            success: true,
            data: deletedProduct,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }
        break;

      default:
        console.log("request method was neither GET, PATCH or DELETE");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
