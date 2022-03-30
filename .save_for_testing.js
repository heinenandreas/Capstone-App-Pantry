import { DeleteItem } from "./components/Buttons/Buttons";

async function handleDeleteItemClick() {
  if (
    confirm(
      `Möchtest du \n\n"${product.productName}"\n\n unwiederbringlich löschen?`
    )
  ) {
    const response = await fetch(`/api/products/${product._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      products.mutate();
    }
  }
}

<DeleteItem onClick={handleDeleteItemClick}></DeleteItem>;
