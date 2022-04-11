import styled from "styled-components";

export function HighlightActualAmountNegative(product) {
  if (product.actualAmount <= product.minAmount) {
    return (
      <StyledListNegativeActualAmount>
        {product.actualAmount}
      </StyledListNegativeActualAmount>
    );
  } else {
    return (
      <StyledListActualAmount>{product.actualAmount}</StyledListActualAmount>
    );
  }
}

export function HighlightActualAmountPositive(product) {
  if (product.actualAmount >= product.maxAmount) {
    return (
      <StyledListPositiveActualAmount>
        {product.actualAmount}
      </StyledListPositiveActualAmount>
    );
  } else {
    return (
      <StyledListShoppingAmount>
        {product.actualAmount}
      </StyledListShoppingAmount>
    );
  }
}

const StyledListActualAmount = styled.p`
  color: var(--darkblue);
  font-size: 2.5rem;
`;

const StyledListShoppingAmount = styled.p`
  color: var(--darkblue);
  font-size: 2.5rem;
`;

const StyledListNegativeActualAmount = styled.p`
  color: var(--pink);
  font-size: 2.5rem;
`;

const StyledListPositiveActualAmount = styled.p`
  color: var(--green);
  font-size: 2.5rem;
`;
