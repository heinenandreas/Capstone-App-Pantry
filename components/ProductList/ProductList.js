import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";
import Settings from "../../src/Icons/Settings.svg";
import { HighlightActualAmount } from "../HighlightAmount/HighlightAmount";
import { Increment, Decrement } from "../Buttons/Buttons";
import {
  AmountBar,
  ElementContainer,
  StyledItem,
  StyledListName,
  StyledListUnit,
} from "../../components/Styles/Styles";

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
        .filter((product) => product.category === category.name)
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
                <HighlightActualAmount
                  product={product}
                  actualAmount={product.actualAmount}
                  maxAmount={product.maxAmount}
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

const StyledList = styled.div`
  border: 2px solid var(--darkblue);
  border-top: 0px;
  border-left: 0px;
  background-color: var(--lightorange);
`;

const StyledSettings = styled.div`
  cursor: pointer;
`;
