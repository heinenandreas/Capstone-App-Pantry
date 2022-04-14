import styled from "styled-components";
import Link from "next/link";
import Add from "../../src/Icons/Add.svg";
import Remove from "../../src/Icons/Remove.svg";
import useSWR from "swr";
import TrashcanSmall from "../../src/Icons/TrashcanSmall.svg";
import Settings from "../../src/Icons/Settings.svg";
import { HighlightActualAmountNegative } from "../HighlightAmount/HighlightAmount";

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
              <HighlightActualAmountNegative
                product={product}
                actualAmount={product.actualAmount}
                minAmount={product.minAmount}
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
              <StyledListUnit>{product.unit}</StyledListUnit>
              <Link href={"/edit-product/" + product._id} passHref>
                <StyledSettings>
                  <Settings />
                </StyledSettings>
              </Link>
              <Link href={"/delete-product/" + product._id} passHref>
                <StyledTrash>
                  <TrashcanSmall />
                </StyledTrash>
              </Link>
            </ElementContainer>
          </StyledItem>
        ))}
    </StyledList>
  );
}

const StyledList = styled.div`
  width: 100%;
  border: 2px solid var(--darkblue);
  border-top: 0px;
  border-left: 0px;
  background-color: var(--lightorange);
`;

const ElementContainer = styled.div`
  width: 15rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 0.5rem;
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  border-top: 2px solid var(--lightblue);
`;
const StyledListName = styled.p`
  color: var(--darkblue);
  font-size: 1.25rem;
  padding-left: 1rem;
`;
const StyledListUnit = styled.p`
  left: 75vw;
  color: var(--darkblue);
  font-size: 0.625rem;
`;

const IncrementButton = styled.button`
  background-color: var(--lightgreen);
  border: 2px solid var(--green);
  border-radius: 999px;
  height: 1.87rem;
  width: 1.87rem;
  transition: 0.2s;
  font-size: 1.87rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-size: 1.25rem;
    transform: scale(1.1) rotate(90deg);
    background-color: var(--green);
    border: 2px solid var(--lightgreen);
  }
`;

const DecrementButton = styled.button`
  background-color: var(--neonpink);
  border: 2px solid var(--pink);
  border-radius: 999px;
  height: 1.87rem;
  width: 1.87rem;
  transition: 0.2s;
  font-size: 1.87rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-size: 1.25rem;
    transform: scale(1.1) rotate(180deg);
    background-color: var(--pink);
    border: 2px solid var(--neonpink);
  }
`;

const StyledTrash = styled.div`
  cursor: pointer;
`;
const StyledSettings = styled.div`
  cursor: pointer;
`;
