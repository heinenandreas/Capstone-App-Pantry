import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { useState } from "react";
import { units, categories } from "../../itemlist";
import Remove from "../../src/Icons/Remove.svg";
import Add from "../../src/Icons/Add.svg";
import Link from "next/link";
import {
  ButtonBack,
  ButtonSave,
  ButtonDelete,
} from "../../components/Buttons/Buttons";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function ProductId(product) {
  const router = useRouter();
  const { productId } = router.query;
  const products = useSWR("/api/products", fetcher);
  const productList = products.data;

  const [productName, setProductName] = useState("");

  async function handleProductEdit(event) {
    event.preventDefault();
    //const response = await fetch (`/api/products/${productId}`),{
    const response = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        productName: productName,
        // unit: unit,
        // category: category,
        // minAmount: minAmount,
        // actualAmount: actualAmount,
        // maxAmount: maxAmount,
      }),
    });
    const updatedProduct = await response.json();
    if (updatedProduct.success) {
      products.mutate();
      router.push("/");
    }
  }

  return products.data ? (
    <>
      <FormStyled onSubmit={handleProductEdit}>
        {productList
          .filter((product) => product._id === productId)
          .map((product) => (
            <>
              <LabelStyled>Produkt bearbeiten</LabelStyled>
              <h1>{product.productName}</h1>

              <StyledInput
                type="text"
                required
                name="productName"
                placeholder="Produktname"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
              />
              {/* <p>Maßeinheit</p>
          <StyledSelect
            required
            placeholder="Maß z.B. kg, Pkg, Flasche, Stk"
            onChange={(product) => handleProductEdit(product._id, product.unit)}
          >
            <StyledOption value="" disabled hidden>
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
            onChange={(product) =>
              handleProductEdit(product._id, product.category)
            }
          >
            <StyledOption value="" disabled hidden>
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
            <DecrementButton
              onClick={(product) => {
                if (product.minAmount > 0) {
                  handleProductEdit(product._id, product.minAmount - 1);
                }
              }}
            >
              <Remove />
            </DecrementButton>
            <StyledInput
              required
              type="number"
              pattern="/d*"
              name="minAmount"
              placeholder="Min"
              onChange={(product) => handleProductEdit()}
            />
            <IncrementButton
              onClick={(product) =>
                handleProductEdit(product._id, product.actualAmount + 1)
              }
            >
              <Add />
            </IncrementButton>
          </AmountStyle>
          <p>aktueller Bestand</p>
          <AmountStyle>
            <DecrementButton
              onClick={(product) => {
                if (product.actualAmount > 0) {
                  handleProductEdit(product._id, product.actualAmount - 1);
                }
              }}
            >
              <Remove />
            </DecrementButton>
            <StyledInput
              required
              type="number"
              name="actualAmount"
              placeholder="Aktuell"
              onChange={(product) => handleProductEdit()}
            />
            <IncrementButton
              onClick={(product) =>
                handleProductEdit(product._id, product.actualAmount + 1)
              }
            >
              <Add />
            </IncrementButton>
          </AmountStyle>
          <p>Maximalbestand</p>
          <AmountStyle>
            <DecrementButton
              onClick={(product) => {
                if (product.maxAmount > 0) {
                  handleProductEdit(product._id, product.maxAmount - 1);
                }
              }}
            >
              <Remove />
            </DecrementButton>
            <StyledInput
              required
              type="number"
              name="maxAmount"
              placeholder="Max"
              onChange={(product) => handleProductEdit(event.target.value)}
            />
  
            <IncrementButton
              onClick={(product) => handleProductEdit(event.target.value)}
            >
              <Add />
            </IncrementButton>
          </AmountStyle> */}
            </>
          ))}

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
    </>
  ) : (
    <div>loading</div>
  );
}

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

export default ProductId;
