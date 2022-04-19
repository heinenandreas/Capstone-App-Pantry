import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";
import TrashcanSmall from "../../src/Icons/TrashcanSmall.svg";
import Settings from "../../src/Icons/Settings.svg";
import { HighlightActualAmountNegative } from "../HighlightAmount/HighlightAmount";
import { Increment, Decrement } from "../Buttons/Buttons";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

export function ProductList(category) {
  const products = useSWR("/api/products", fetcher);
  const productlist = products.data;

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

  return (
    <StyledList>
      {productlist
        .filter((product, name) => product.category === category.name)
        .map((product) => (
          <StyledItem key={product._id}>
            <StyledListName>{product.productName}</StyledListName>
            <ElementContainer>
              <AmountBar>
                <Decrement
                  decrement={() => {
                    if (product.actualAmount > 0) {
                      handleProductAmount(
                        product._id,
                        product.actualAmount - 1
                      );
                    }
                  }}
                />
                <HighlightActualAmountNegative
                  product={product}
                  actualAmount={product.actualAmount}
                  minAmount={product.minAmount}
                />
                <Increment
                  increment={() =>
                    handleProductAmount(product._id, product.actualAmount + 1)
                  }
                />
              </AmountBar>
              <StyledListUnit>{product.unit}</StyledListUnit>
              <Link href={"/edit-product/" + product._id} passHref>
                <StyledSettings>
                  <Settings />
                </StyledSettings>
              </Link>
            </ElementContainer>
          </StyledItem>
        ))}
    </StyledList>
  );
}

const AmountBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.2rem;
`;

const StyledList = styled.div`
  width: 100%;
  border: 2px solid var(--darkblue);
  border-top: 0px;
  border-left: 0px;
  background-color: var(--lightorange);
`;

const ElementContainer = styled.div`
  width: 17rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  border-top: 2px solid var(--lightblue);
`;
const StyledListName = styled.p`
  width: 50%;
  color: var(--darkblue);
  font-size: 1.1rem;
  padding-left: 1rem;
`;
const StyledListUnit = styled.p`
  left: 75vw;
  color: var(--darkblue);
  font-size: 0.625rem;
`;

const StyledSettings = styled.div`
  cursor: pointer;
`;
