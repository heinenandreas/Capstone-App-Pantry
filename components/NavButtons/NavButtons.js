import styled from "styled-components";
import AddBig from "../../src/Icons/AddBig.svg";

export function ButtonAddCategory() {
  return (
    <AddCategory>
      <AddBig />
    </AddCategory>
  );
}

const AddCategory = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 3rem;
  right: 3rem;
  background-color: white;
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
`;
