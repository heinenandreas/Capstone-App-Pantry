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

async function handleEditJoke(newText) {
  setIsUpdating(true);
  const response = await fetch(`/api/jokes/${joke._id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: newText }),
  });
  const updatedJoke = await response.json();
  if (response.ok) {
    jokes.mutate();
    setError();
    setIsEditMode(false);
  } else {
    setError(updatedJoke.error ?? "Something went wrong");
  }
}

{
  !hidden ? (
    <>
      <StyledList></StyledList>
    </>
  ) : null;
}
