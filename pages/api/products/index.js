import Product from "../../../schema/Product";
import { connectDb } from "../../../utils/db";
import { getSession } from "next-auth/react";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        if (session) {
          const products = await Product.find()
            .where({
              userId: session.user.id,
            })
            .populate("userId");
          response.status(200).json(products);
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      case "POST":
        if (session) {
          const createdProduct = await Product.create({
            ...request.body,
            userId: session.user.id,
          });
          response.status(200).json({ success: true, data: createdProduct });
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
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
