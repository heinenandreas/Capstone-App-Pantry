import { useState } from "react";
import { itemlist as initialItemList } from "../../itemlist";
import styled from "styled-components";
import Remove from "../../src/Icons/Remove.svg";
import Add from "../../src/Icons/Add.svg";

function IncrementCounter() {
  const [itemlist, setItemlist] = useState(initialItemList);
  return (
    <>
      {itemlist.map((item) => {
        return (
          <StyledItem key={item.id}>
            <StyledListName>{item.name}</StyledListName>
            <StyledListUnit>{item.unit}</StyledListUnit>
            <DecrementButton
              type="button"
              key={item.name}
              amount={item.actualAmount}
              onClick={() => {
                setItemlist(
                  itemlist.map((innerItem) => {
                    if (
                      innerItem.id === item.id &&
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
            <StyledListActualAmount>{item.actualAmount}</StyledListActualAmount>
            <IncrementButton
              type="button"
              key={item.id}
              amount={item.actualAmount}
              onClick={() => {
                setItemlist(
                  itemlist.map((innerItem) => {
                    if (innerItem.id === item.id) {
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
        );
      })}
    </>
  );
}

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

export default IncrementCounter;
