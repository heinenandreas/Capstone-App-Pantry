import styled from "styled-components";
import Counter from "../Counter/Counter";

function ItemList() {
  return (
    <StyledList>
      <StyledAmountHeadline>
        <p>min</p>
        <h3>aktuell</h3>
        <p>max</p>
      </StyledAmountHeadline>
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
  width: 20.9rem;

  border: 2px solid var(--darkblue);
  border-top: 0px;
  border-left: 0px;
  border-radius: 0 0 22px 0;
`;

export default ItemList;
