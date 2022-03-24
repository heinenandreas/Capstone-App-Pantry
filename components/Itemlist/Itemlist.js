import react from "react";
import { itemlist } from "../../itemlist";
import styled from "styled-components";

function ItemList() {
  return (
    <StyledList>
      <StyledAmountHeadline>
        <p>min</p>
        <h3>aktuell</h3>
        <p>max</p>
      </StyledAmountHeadline>
      {itemlist.map((item) => {
        return (
          <StyledItem key={item.id}>
            <StyledListName>{item.name}</StyledListName>
            <StyledListUnit>{item.unit}</StyledListUnit>
            <StyledListMinMaxAmount>{item.minAmount}</StyledListMinMaxAmount>
            <StyledListActualAmount>{item.actualAmount}</StyledListActualAmount>
            <StyledListMinMaxAmount>{item.maxAmount}</StyledListMinMaxAmount>
          </StyledItem>
        );
      })}
    </StyledList>
  );
}

/* Style for amount-Headline */
const StyledAmountHeadline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 1em;
  gap: 1.5em;
  align-items: flex-end;

  color: var(--darkblue);
`;

/* Style for Itemlist*/

const StyledList = styled.div`
  height: auto;
  width: 342px;
  border: 2px solid var(--darkblue);
  border-radius: 0 0 22px 0;
`;

const StyledItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const StyledListName = styled.p`
  color: var(--darkblue);
  font-size: 20px;
`;

const StyledListUnit = styled.p`
  color: var(--darkblue);
  font-size: 16px;
`;
const StyledListActualAmount = styled.p`
  color: var(--darkblue);
  font-size: 40px;
`;

const StyledListMinMaxAmount = styled.p`
  color: var(--darkblue);
  font-size: 20px;
`;

export default ItemList;
