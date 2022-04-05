import useSWR from "swr";
import styled from "styled-components";

import Add from "../src/Icons/Add.svg";
import Remove from "../src/Icons/Remove.svg";
import { HighlightActualAmountPositive } from "../components/HighlightAmount/HighlightAmount";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function Shoppinglist() {
  const products = useSWR("/api/products", fetcher);
  const productList = products.data;

  async function handleProductAmount(id, actualAmount) {
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ actualAmount: actualAmount }),
    });
    const updatedProduct = await response.json();
    if (updatedProduct.success) {
      products.mutate();
    }
  }

  return products.data ? (
    <>
      <ShoppinglistStyled>
        <CategoryNameStyled>Shoppinglist</CategoryNameStyled>
      </ShoppinglistStyled>
      <StyledList>
        {productList.map((product) => (
          <StyledItem key={product._id}>
            <StyledListName>{product.productName}</StyledListName>
            <StyledListUnit>{product.unit}</StyledListUnit>
            <DecrementButton
              type="button"
              amount={product.actualAmount}
              onClick={() => {
                if (product.actualAmount > 0) {
                  handleProductAmount(product._id, product.actualAmount - 1);
                }
              }}
            >
              <Remove />
            </DecrementButton>
            <HighlightActualAmountPositive
              product={product}
              actualAmount={product.actualAmount}
              maxAmount={product.maxAmount}
            />
            <IncrementButton
              type="button"
              key={product.name}
              amount={product.actualAmount}
              onClick={() =>
                handleProductAmount(product._id, product.actualAmount + 1)
              }
            >
              <Add />
            </IncrementButton>
            <StyledListActualAmount>{product.maxAmount}</StyledListActualAmount>
          </StyledItem>
        ))}
      </StyledList>
    </>
  ) : (
    <div>loading</div>
  );
}

const StyledListActualAmount = styled.p`
  position: absolute;
  left: 58vw;
  color: var(--darkblue);
  font-size: 40px;
`;

const CategoryNameStyled = styled.h3`
  font-size: 1.6rem;
  margin: 0;
  padding-left: 0.5rem;
  color: var(--darkblue);
  border-radius: 0 1em 1em 0;
`;

const ShoppinglistStyled = styled.div`
  height: 2.5rem;
  width: 95vw;
  background-color: var(--lightgreen);
  border-radius: 0 1em 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  border-bottom: 3px solid var(--green);

  &:hover {
    background-color: var(--green);
  }
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
  left: 80vw;
  color: var(--darkblue);
  font-size: 10px;
`;

const IncrementButton = styled.button`
  position: absolute;
  left: 57vw;
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
  left: 38vw;
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

export default Shoppinglist;
