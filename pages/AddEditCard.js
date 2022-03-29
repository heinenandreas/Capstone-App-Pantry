useState;
import { useState } from "react/cjs/react.development";
import { units, categories } from "../itemlist";
import styled from "styled-components";
import Remove from "../src/Icons/Remove.svg";
import Add from "../src/Icons/Add.svg";
import {
  ButtonBack,
  ButtonDelete,
  ButtonSave,
} from "../components/Buttons/Buttons";

// plus button fügt eine 1 hinzu wenn man vorher eine zahl eingetippt hat
//maßeinheiten
// kann man über form option mappen?
// decrement und increment verallgemeinern?

function AddEditCard() {
  const [productName, setProductName] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [actualAmount, setActualAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  const decrementMinAmount = () => {
    if (minAmount > 0) setMinAmount(minAmount - 1);
  };

  const incrementMinAmount = () => {
    setMinAmount(minAmount + 1);
  };

  const decrementActualAmount = () => {
    if (actualAmount > 0) setActualAmount(actualAmount - 1);
  };

  const incrementActualAmount = () => {
    setActualAmount(actualAmount + 1);
  };

  const decrementMaxAmount = () => {
    if (maxAmount > 0) setMaxAmount(maxAmount - 1);
  };

  const incrementMaxAmount = () => {
    setMaxAmount(maxAmount + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = {
      productName,
      unit,
      category,
      minAmount,
      actualAmount,
      maxAmount,
    };
    console.log(product);
  };
  return (
    <AddCardStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>Neues Produkt</LabelStyled>
        <p>Produktname</p>
        <StyledInput
          type="text"
          required
          name="productName"
          placeholder="Produktname"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />
        <p>Maßeinheit</p>
        <StyledSelect
          required
          placeholder="Maß z.B. kg, Pkg, Flasche, Stk"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
        >
          <StyledOption defaultValue="selected">
            Wähle eine Einheit
          </StyledOption>
          <StyledOption>
            {units.map((unit) => {
              return unit.name;
            })}
          </StyledOption>
        </StyledSelect>
        <p>Kategorie</p>
        <StyledSelect
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <StyledOption defaultValue="selected">
            Wähle eine Kategorie
          </StyledOption>
          <StyledOption>
            {categories.map((category) => {
              return category.name;
            })}
          </StyledOption>
          {/* <StyledOption value={categories[1].name}>
            {categories[1].name}
          </StyledOption>
          <StyledOption value={categories[2].name}>
            {categories[2].name}
          </StyledOption>
          <StyledOption value={categories[3].name}>
            {categories[3].name}
          </StyledOption>
          <StyledOption value={categories[4].name}>
            {categories[4].name}
          </StyledOption>
          <StyledOption value={categories[5].name}>
            {categories[5].name}
          </StyledOption> */}
        </StyledSelect>
        <p>Mindesbestand</p>
        <AmountStyle>
          <DecrementButton
            onClick={(event) => decrementMinAmount(event.target.value)}
          >
            <Remove />
          </DecrementButton>
          <StyledInput
            required
            type="number"
            pattern="/d*"
            name="minAmount"
            placeholder="Min"
            value={minAmount}
            onChange={(event) => setMinAmount(event.target.value)}
          />

          <IncrementButton
            onClick={(event) => incrementMinAmount(event.target.value)}
          >
            <Add />
          </IncrementButton>
        </AmountStyle>
        <p>aktueller Bestand</p>
        <AmountStyle>
          <DecrementButton
            onClick={(event) => decrementActualAmount(event.target.value)}
          >
            <Remove />
          </DecrementButton>
          <StyledInput
            required
            type="number"
            name="actualAmount"
            placeholder="Aktuell"
            value={actualAmount}
            onChange={(event) => setActualAmount(event.target.value)}
          />

          <IncrementButton
            onClick={(event) => incrementActualAmount(event.target.value)}
          >
            <Add />
          </IncrementButton>
        </AmountStyle>
        <p>Maximalbestand</p>
        <AmountStyle>
          <DecrementButton
            onClick={(event) => decrementMaxAmount(event.target.value)}
          >
            <Remove />
          </DecrementButton>
          <StyledInput
            required
            type="number"
            name="maxAmount"
            placeholder="Max"
            value={maxAmount}
            onChange={(event) => setMaxAmount(event.target.value)}
          />

          <IncrementButton
            onClick={(event) => incrementMaxAmount(event.target.value)}
          >
            <Add />
          </IncrementButton>
        </AmountStyle>
        <ButtonBar>
          <a href="/">
            <ButtonBack />
          </a>
          <ButtonSave type="submit" />
          <ButtonDelete />
        </ButtonBar>
      </FormStyled>
    </AddCardStyled>
  );
}

const AddCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23.44rem;
  height: 40rem;
  border: 2px solid var(--darkblue);
`;

const LabelStyled = styled.label`
  margin: 1rem 0;
  font-size: 40px;
`;
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  border-radius: 0.6rem;
  border: 2px solid var(--darkblue);
  width: 12rem;
  height: 2rem;
  margin: 0.6rem 0;

  &::placeholder {
    text-align: center;
    color: var(--lightblue);
  }
`;

const StyledOption = styled.option`
  text-align: center;
  color: var(--lightblue);
`;
const StyledSelect = styled.select`
  border-radius: 0.6rem;
  border: 2px solid var(--darkblue);
  width: 12rem;
  height: 2rem;
  margin: 0.6rem 0;

  &::placeholder {
    text-align: center;
    color: var(--lightblue);
  }
`;

const AmountStyle = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 1rem 0;
  color: var(--darkblue);
  input[type="number"] {
    text-align: center;
    -moz-appearance: textfield;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ButtonBar = styled.div`
  width: 23.44rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const IncrementButton = styled.div`
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
  margin: 0 1rem;

  &:hover {
    font-size: 20px;
    transform: scale(1.1) rotate(90deg);
    background-color: var(--green);
    border: 2px solid var(--lightgreen);
  }
`;

const DecrementButton = styled.div`
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
  margin: 0 1rem;

  &:hover {
    font-size: 20px;
    transform: scale(1.1) rotate(180deg);
    background-color: var(--pink);
    border: 2px solid var(--neonpink);
  }
`;

export default AddEditCard;
