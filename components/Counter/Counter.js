import { useState } from "react";
import {
  itemlist as initialItemList,
  pantrylist,
  category,
} from "../../itemlist";
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

const CategoryStyled = styled.div`
  height: 2rem;
  width: 95%;
  background-color: var(--lightgreen);
  border-radius: 0 1em 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CategoryNameStyled = styled.h3`
  font-size: 1.6rem;
  margin: 0;
  padding-left: 0.5rem;
  color: white;
  border-radius: 0 1em 1em 0;
`;

const AddProductButton = styled.a`
  height: 2rem;
  width: 2rem;
  margin: 0;
  padding-right: 0.5rem;
  color: white;
  font-size: 1.5rem;
  border: 0;
  border-radius: 999px;
  background-color: var(--lightgreen);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

export default IncrementCounter;
