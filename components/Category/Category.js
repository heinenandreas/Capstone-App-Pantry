import { useState } from "react";
import styled from "styled-components";
import Add from "../../src/Icons/Add.svg";
import Remove from "../../src/Icons/Remove.svg";
import Link from "next/link";
import useSWR from "swr";
import TrashcanSmall from "../../src/Icons/TrashcanSmall.svg";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function Category() {
  const products = useSWR("/api/products", fetcher);
  const productList = products.data;

  const [itemlist, setItemlist] = useState(productList);

  async function handleDeleteItemClick(id, productname) {
    if (
      confirm(`Möchtest du \n\n${productname}\n\n unwiederbringlich löschen?`)
    ) {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        products.mutate();
      }
    }
  }

  async function handleIncrementProductAmount(id) {
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ actualAmount: actualAmount }),
    });
    const updatedJoke = await response.json();
    if (response.ok) {
      products.mutate();
    }
  }

  return (
    <>
      {products.data ? (
        <>
          <CategoryStyled>
            <CategoryNameStyled>Gemüse</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            {productList
              .filter((product) => product.category === "Gemüse")
              .map((product) => (
                <StyledItem key={product._id}>
                  {console.log(productList)}
                  {console.log(product._id)}
                  <StyledListName>{product.productName}</StyledListName>
                  <StyledListUnit>{product.unit}</StyledListUnit>
                  <DecrementButton
                    type="button"
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (
                            innerItem.id === fridgeitem.id &&
                            innerItem.actualAmount > 0
                          ) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount - 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Remove />
                  </DecrementButton>
                  <StyledListActualAmount>
                    {product.actualAmount}
                  </StyledListActualAmount>
                  <IncrementButton
                    type="button"
                    key={product.name}
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (innerItem.id === fridgeitem.id) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount + 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Add />
                  </IncrementButton>
                  <StyledTrash>
                    <TrashcanSmall
                      onClick={() =>
                        handleDeleteItemClick(product._id, product.productName)
                      }
                    />
                  </StyledTrash>
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Obst</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            {productList
              .filter((product) => product.category === "Obst")
              .map((product) => (
                <StyledItem key={product._id}>
                  <StyledListName>{product.productName}</StyledListName>
                  <StyledListUnit>{product.unit}</StyledListUnit>
                  <DecrementButton
                    type="button"
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (
                            innerItem.id === fridgeitem.id &&
                            innerItem.actualAmount > 0
                          ) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount - 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Remove />
                  </DecrementButton>
                  <StyledListActualAmount>
                    {product.actualAmount}
                  </StyledListActualAmount>
                  <IncrementButton
                    type="button"
                    key={product.name}
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (innerItem.id === fridgeitem.id) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount + 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Add />
                  </IncrementButton>
                  <StyledTrash>
                    <TrashcanSmall
                      onClick={() =>
                        handleDeleteItemClick(product._id, product.productName)
                      }
                    />
                  </StyledTrash>
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Kühlwaren</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            {productList
              .filter((product) => product.category === "Kühlwaren")
              .map((product) => (
                <StyledItem key={product._id}>
                  <StyledListName>{product.productName}</StyledListName>
                  <StyledListUnit>{product.unit}</StyledListUnit>
                  <DecrementButton
                    type="button"
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (
                            innerItem.id === fridgeitem.id &&
                            innerItem.actualAmount > 0
                          ) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount - 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Remove />
                  </DecrementButton>
                  <StyledListActualAmount>
                    {product.actualAmount}
                  </StyledListActualAmount>
                  <IncrementButton
                    type="button"
                    key={product.name}
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (innerItem.id === fridgeitem.id) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount + 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Add />
                  </IncrementButton>
                  <StyledTrash>
                    <TrashcanSmall
                      onClick={() =>
                        handleDeleteItemClick(product._id, product.productName)
                      }
                    />
                  </StyledTrash>
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Tiefkühlwaren</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            {productList
              .filter((product) => product.category === "Tiefkühlwaren")
              .map((product) => (
                <StyledItem key={product._id}>
                  <StyledListName>{product.productName}</StyledListName>
                  <StyledListUnit>{product.unit}</StyledListUnit>
                  <DecrementButton
                    type="button"
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (
                            innerItem.id === fridgeitem.id &&
                            innerItem.actualAmount > 0
                          ) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount - 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Remove />
                  </DecrementButton>
                  <StyledListActualAmount>
                    {product.actualAmount}
                  </StyledListActualAmount>
                  <IncrementButton
                    type="button"
                    key={product.name}
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (innerItem.id === fridgeitem.id) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount + 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Add />
                  </IncrementButton>
                  <StyledTrash>
                    <TrashcanSmall
                      onClick={() =>
                        handleDeleteItemClick(product._id, product.productName)
                      }
                    />
                  </StyledTrash>
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Lebensmittel</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            {productList
              .filter((product) => product.category === "Lebensmittel")
              .map((product) => (
                <StyledItem key={product._id}>
                  <StyledListName>{product.productName}</StyledListName>
                  <StyledListUnit>{product.unit}</StyledListUnit>
                  <DecrementButton
                    type="button"
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (
                            innerItem.id === fridgeitem.id &&
                            innerItem.actualAmount > 0
                          ) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount - 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Remove />
                  </DecrementButton>
                  <StyledListActualAmount>
                    {product.actualAmount}
                  </StyledListActualAmount>
                  <IncrementButton
                    type="button"
                    key={product.name}
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (innerItem.id === fridgeitem.id) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount + 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Add />
                  </IncrementButton>
                  <StyledTrash>
                    <TrashcanSmall
                      onClick={() =>
                        handleDeleteItemClick(product._id, product.productName)
                      }
                    />
                  </StyledTrash>
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Getränke</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            {productList
              .filter((product) => product.category === "Getränke")
              .map((product) => (
                <StyledItem key={product._id}>
                  <StyledListName>{product.productName}</StyledListName>
                  <StyledListUnit>{product.unit}</StyledListUnit>
                  <DecrementButton
                    type="button"
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (
                            innerItem.id === fridgeitem.id &&
                            innerItem.actualAmount > 0
                          ) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount - 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Remove />
                  </DecrementButton>
                  <StyledListActualAmount>
                    {product.actualAmount}
                  </StyledListActualAmount>
                  <IncrementButton
                    type="button"
                    key={product.name}
                    amount={product.actualAmount}
                    onClick={() => {
                      setItemlist(
                        itemlist.map((innerItem) => {
                          if (innerItem.id === fridgeitem.id) {
                            return {
                              ...innerItem,
                              actualAmount: innerItem.actualAmount + 1,
                            };
                          } else {
                            return innerItem;
                          }
                        })
                      );
                    }}
                  >
                    <Add />
                  </IncrementButton>
                  <StyledTrash>
                    <TrashcanSmall
                      onClick={() =>
                        handleDeleteItemClick(product._id, product.productName)
                      }
                    />
                  </StyledTrash>
                </StyledItem>
              ))}
          </StyledList>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

const CategoryStyled = styled.div`
  height: 2rem;
  width: 95vw;
  background-color: var(--lightgreen);
  border-radius: 0 1em 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CategoryNameStyled = styled.h3`
  font-size: 1.6rem;
  margin: 0;
  padding-left: 0.5rem;
  color: var(--darkblue);
  border-radius: 0 1em 1em 0;
`;

const StyledList = styled.div`
  display: grid;
  height: auto;
  width: 92vw;
  border: 2px solid var(--darkblue);
  border-top: 0px;
  border-left: 0px;
  border-radius: 0 0 22px 0;
  background-color: #ffebd9;
`;

const StyledItem = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  border-top: 2px solid var(--lightblue);
`;
const StyledListName = styled.p`
  position: absolute;
  left: 1vw;
  color: var(--darkblue);
  font-size: 20px;
  padding-left: 1rem;
`;
const StyledListUnit = styled.p`
  position: absolute;
  left: 75vw;
  color: var(--darkblue);
  font-size: 10px;
`;

const IncrementButton = styled.button`
  position: absolute;
  left: 67vw;
  color: white;
  background-color: var(--lightgreen);
  border: 2px solid var(--green);
  border-radius: 999px;
  height: 30px;
  width: 30px;
  transition: 0.2s;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-size: 20px;
    transform: scale(1.1) rotate(90deg);
    background-color: var(--green);
    border: 2px solid var(--lightgreen);
  }
`;

const DecrementButton = styled.button`
  position: absolute;
  left: 48vw;
  color: white;
  background-color: var(--neonpink);
  border: 2px solid var(--pink);
  border-radius: 999px;
  height: 30px;
  width: 30px;
  transition: 0.2s;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-size: 20px;
    transform: scale(1.1) rotate(180deg);
    background-color: var(--pink);
    border: 2px solid var(--neonpink);
  }
`;

const StyledListActualAmount = styled.p`
  position: absolute;
  left: 58vw;
  color: var(--darkblue);
  font-size: 40px;
`;

const StyledTrash = styled.div`
  cursor: pointer;
  position: absolute;
  left: 83vw;
`;

export default Category;
