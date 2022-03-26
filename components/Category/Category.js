import styled from "styled-components";
import { itemlist as initialItemList } from "../../itemlist";
import { categoryItemlist } from "../../itemlist";
import ItemList from "../Itemlist/Itemlist";
import Add from "../../src/Icons/Add.svg";

function Category() {
  return (
    <>
      {console.log(categoryItemlist[0].categoryName)}
      <CategoryStyled>
        <CategoryNameStyled>
          {categoryItemlist[0].categoryName}
        </CategoryNameStyled>
        <div>
          <AddProductButton>
            <Add />
          </AddProductButton>
          {/*Edit-Button*/}
        </div>
      </CategoryStyled>
      <ItemList />
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

const AddProductButton = styled.button`
  height: 2rem;
  width: 2rem;
  margin: 0;
  padding-left: 0.5rem;
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

export default Category;
