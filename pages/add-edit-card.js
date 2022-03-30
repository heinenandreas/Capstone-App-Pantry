import { useState } from "react";
import { units, categories } from "../itemlist";
import styled from "styled-components";
import Remove from "../src/Icons/Remove.svg";
import Add from "../src/Icons/Add.svg";
import {
  ButtonBack,
  ButtonDelete,
  ButtonSave,
} from "../components/Buttons/Buttons";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

// plus button fügt eine 1 hinzu wenn man vorher eine zahl eingetippt hat
//maßeinheiten

function AddEditCard({ product }) {
  const products = useSWR("/api/products", fetcher);
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [actualAmount, setActualAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  async function handleCreateProduct(event) {
    event.preventDefault();
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        productName: productName,
        unit: unit,
        category: category,
        minAmount: minAmount,
        actualAmount: actualAmount,
        maxAmount: maxAmount,
      }),
    });
    const createdProduct = await response.json();
    if (createdProduct.success) {
      products.mutate();
      router.push("/");
    } else {
    }
  }

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

  return (
    <AddCardStyled>
      <FormStyled onSubmit={handleCreateProduct}>
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
          <StyledOption disabled defaultValue="selected">
            Wähle eine Einheit
          </StyledOption>

          {units.map((unit) => {
            return (
              <StyledOption key={unit.name} value={unit.name}>
                {unit.name}
              </StyledOption>
            );
          })}
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
          {categories.map((category) => {
            return (
              <StyledOption key={category.name} value={category.name}>
                {category.name}
              </StyledOption>
            );
          })}
        </StyledSelect>
        <p>Mindesbestand</p>
        <AmountStyle>
          <DecrementButton onClick={(event) => decrementMinAmount()}>
            <Remove />
          </DecrementButton>
          <StyledInput
            required
            type="number"
            pattern="/d*"
            name="minAmount"
            placeholder="Min"
            value={minAmount}
            onChange={(event) => setMinAmount()}
          />
          <IncrementButton onClick={(event) => incrementMinAmount()}>
            <Add />
          </IncrementButton>
        </AmountStyle>
        <p>aktueller Bestand</p>
        <AmountStyle>
          <DecrementButton onClick={(event) => decrementActualAmount()}>
            <Remove />
          </DecrementButton>
          <StyledInput
            required
            type="number"
            name="actualAmount"
            placeholder="Aktuell"
            value={actualAmount}
            onChange={(event) => setActualAmount()}
          />
          <IncrementButton onClick={(event) => incrementActualAmount()}>
            <Add />
          </IncrementButton>
        </AmountStyle>
        <p>Maximalbestand</p>
        <AmountStyle>
          <DecrementButton onClick={(event) => decrementMaxAmount()}>
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
          <Link href="/">
            <a>
              <ButtonBack />
            </a>
          </Link>
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
