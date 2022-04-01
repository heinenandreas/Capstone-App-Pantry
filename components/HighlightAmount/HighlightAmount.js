import styled from "styled-components";

export function HighlightActualAmount(product, actualAmount, minAmount) {
  console.log(product);
  if (product.actualAmount < product.minAmount) {
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

const StyledListActualAmount = styled.p`
  position: absolute;
  left: 58vw;
  color: var(--darkblue);
  font-size: 40px;
`;

const StyledListNegativeActualAmount = styled.p`
  position: absolute;
  left: 58vw;
  color: var(--pink);
  font-size: 40px;
`;
