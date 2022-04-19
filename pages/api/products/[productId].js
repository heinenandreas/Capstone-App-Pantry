import { getSession } from "next-auth/react";
import Product from "../../../schema/Product";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  const { productId } = request.query;

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        if (session) {
          const product = await Product.findById(productId)
            .where({
              userId: session.user.id,
            })
            .populate("userId");
          response.status(200).json(product);
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      case "PATCH":
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        ).where({ userId: session.user.id });
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
        const deletedProduct = await Product.findByIdAndDelete(productId).where(
          { userId: session.user.id }
        );
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
