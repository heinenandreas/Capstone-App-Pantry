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

  async function handleDeleteItemClick() {
    if (
      confirm(
        `Möchtest du \n\n"${productList.productName}"\n\n unwiederbringlich löschen?`
      )
    ) {
      const response = await fetch(`/api/products/${productList._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        products.mutate();
      }
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
            <StyledAmountHeadline>aktueller Bestand</StyledAmountHeadline>
            {productList
              .filter((product) => product.category === "Gemüse")
              .map((product) => (
                <StyledItem key={product._id}>
                  {console.log(productList)}
                  {console.log(product.productName)}
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
                  <TrashcanSmall onClick={handleDeleteItemClick} />
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Obst</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            <StyledAmountHeadline>aktueller Bestand</StyledAmountHeadline>
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
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Kühlwaren</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            <StyledAmountHeadline>aktueller Bestand</StyledAmountHeadline>
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
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Tiefkühlwaren</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            <StyledAmountHeadline>aktueller Bestand</StyledAmountHeadline>
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
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Lebensmittel</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            <StyledAmountHeadline>aktueller Bestand</StyledAmountHeadline>
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
                </StyledItem>
              ))}
          </StyledList>
          <CategoryStyled>
            <CategoryNameStyled>Getränke</CategoryNameStyled>
          </CategoryStyled>
          <StyledList>
            <StyledAmountHeadline>aktueller Bestand</StyledAmountHeadline>
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
  width: 95%;
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

// -------------------- //
//      Itemlist        //
// -------------------- //
/* Style for amount-Headline */
const StyledAmountHeadline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0.3rem 2.5rem 0.3rem 0.3rem;
  align-items: flex-end;
  color: var(--darkblue);
`;

/* Style for Itemlist*/

const StyledList = styled.div`
  display: grid;
  height: auto;
  width: 20.9rem;
  border: 2px solid var(--darkblue);
  border-top: 0px;
  border-left: 0px;
  border-radius: 0 0 22px 0;
  background-color: #ffebd9;
`;

// -------------------- //
//     Item-Style       //
// -------------------- //
const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 0.65fr 0.5fr 1fr 0.6fr;
  justify-content: space-around;
  align-items: center;
  border-top: 2px solid var(--lightblue);
`;
const StyledListName = styled.p`
  color: var(--darkblue);
  font-size: 20px;
  padding-left: 1rem;
`;
const StyledListUnit = styled.p`
  color: var(--darkblue);
  font-size: 12px;
`;

const IncrementButton = styled.button`
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
  color: var(--darkblue);
  font-size: 40px;
`;

export default Category;
