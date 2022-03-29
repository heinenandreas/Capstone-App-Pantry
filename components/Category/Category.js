import { useState } from "react";
import styled from "styled-components";
import {
  initialFridgeList,
  initialShelfList,
  initialFreezerList,
} from "../../itemlist";
import Add from "../../src/Icons/Add.svg";
import Remove from "../../src/Icons/Remove.svg";
import Link from "next/link";

function Category() {
  const [fridgeItemlist, setFridgeItemlist] = useState(initialFridgeList);
  const [shelfItemlist, setShelfItemlist] = useState(initialShelfList);
  const [freezerItemlist, setFreezerItemlist] = useState(initialFreezerList);
  return (
    <>
      <CategoryStyled>
        <CategoryNameStyled>Kühlschrank</CategoryNameStyled>
      </CategoryStyled>
      <StyledList>
        <StyledAmountHeadline>
          <p>min</p>
          <h3>aktuell</h3>
          <p>max</p>
        </StyledAmountHeadline>

        {fridgeItemlist.map((fridgeitem) => {
          return (
            <StyledItem key={fridgeitem.id}>
              <StyledListName>{fridgeitem.name}</StyledListName>
              <StyledListUnit>{fridgeitem.unit}</StyledListUnit>
              <DecrementButton
                type="button"
                amount={fridgeitem.actualAmount}
                onClick={() => {
                  setFridgeItemlist(
                    fridgeItemlist.map((innerItem) => {
                      if (
                        innerItem.id === fridgeitem.id &&
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
              <StyledListActualAmount>
                {fridgeitem.actualAmount}
              </StyledListActualAmount>
              <IncrementButton
                type="button"
                key={fridgeitem.name}
                amount={fridgeitem.actualAmount}
                onClick={() => {
                  setFridgeItemlist(
                    fridgeItemlist.map((innerItem) => {
                      if (innerItem.id === fridgeitem.id) {
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
      </StyledList>
      <CategoryStyled>
        <CategoryNameStyled>Regal</CategoryNameStyled>
      </CategoryStyled>
      <StyledList>
        <StyledAmountHeadline>
          <p>min</p>
          <h3>aktuell</h3>
          <p>max</p>
        </StyledAmountHeadline>

        {shelfItemlist.map((shelfitem) => {
          return (
            <StyledItem key={shelfitem.id}>
              <StyledListName>{shelfitem.name}</StyledListName>
              <StyledListUnit>{shelfitem.unit}</StyledListUnit>
              <DecrementButton
                type="button"
                amount={shelfitem.actualAmount}
                onClick={() => {
                  setShelfItemlist(
                    shelfItemlist.map((innerItem) => {
                      if (
                        innerItem.id === shelfitem.id &&
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
              <StyledListActualAmount>
                {shelfitem.actualAmount}
              </StyledListActualAmount>
              <IncrementButton
                type="button"
                key={shelfitem.name}
                amount={shelfitem.actualAmount}
                onClick={() => {
                  setShelfItemlist(
                    shelfItemlist.map((innerItem) => {
                      if (innerItem.id === shelfitem.id) {
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
      </StyledList>
      <CategoryStyled>
        <CategoryNameStyled>Kühltruhe</CategoryNameStyled>
      </CategoryStyled>
      <StyledList>
        <StyledAmountHeadline>
          <p>min</p>
          <h3>aktuell</h3>
          <p>max</p>
        </StyledAmountHeadline>

        {freezerItemlist.map((freezeritem) => {
          return (
            <StyledItem key={freezeritem.id}>
              <StyledListName>{freezeritem.name}</StyledListName>
              <StyledListUnit>{freezeritem.unit}</StyledListUnit>
              <DecrementButton
                type="button"
                amount={freezeritem.actualAmount}
                onClick={() => {
                  setFreezerItemlist(
                    freezerItemlist.map((innerItem) => {
                      if (
                        innerItem.id === freezeritem.id &&
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
              <StyledListActualAmount>
                {freezeritem.actualAmount}
              </StyledListActualAmount>
              <IncrementButton
                type="button"
                key={freezeritem.name}
                amount={freezeritem.actualAmount}
                onClick={() => {
                  setFreezerItemlist(
                    freezerItemlist.map((innerItem) => {
                      if (innerItem.id === freezeritem.id) {
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
      </StyledList>
    </>
  );
}

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

// -------------------- //
//      Itemlist        //
// -------------------- //
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

// -------------------- //
//     Item-Style       //
// -------------------- //
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

export default Category;
