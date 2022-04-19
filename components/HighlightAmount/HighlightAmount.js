import styled from "styled-components";

export function HighlightActualAmount(product) {
  if (product.actualAmount <= product.minAmount) {
    return (
      <StyledListNegativeActualAmount>
        {product.actualAmount}
      </StyledListNegativeActualAmount>
    );
  } else if (product.actualAmount >= product.maxAmount) {
    return (
      <StyledListPositiveActualAmount>
        {product.actualAmount}
      </StyledListPositiveActualAmount>
    );
  } else {
    return (
      <StyledListActualAmount>{product.actualAmount}</StyledListActualAmount>
    );
  }
}

const StyledListActualAmount = styled.p`
  color: var(--darkblue);
  font-size: 2rem;
`;

const StyledListNegativeActualAmount = styled.p`
  color: var(--pink);
  font-size: 2rem;
`;

const StyledListPositiveActualAmount = styled.p`
  color: var(--green);
  font-size: 2rem;
`;
