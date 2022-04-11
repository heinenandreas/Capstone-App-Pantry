import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { useState } from "react";
import { units, categories } from "../../itemlist";
import Remove from "../../src/Icons/Remove.svg";
import Add from "../../src/Icons/Add.svg";
import Link from "next/link";
import { ButtonBack, ButtonSave } from "../../components/Buttons/Buttons";
import { getSession, useSession } from "next-auth/react";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function ProductId(product) {
  const router = useRouter();
  const { productId } = router.query;
  const products = useSWR("/api/products", fetcher);
  const productList = products.data;

  const [productName, setProductName] = useState(product.name);
  const [unit, setUnit] = useState(product.unit);
  const [category, setCategory] = useState(product.category);
  const [minAmount, setMinAmount] = useState(0);
  const [actualAmount, setActualAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  async function handleProductEdit(event) {
    event.preventDefault();
    const response = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
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
    const updatedProduct = await response.json();
    if (updatedProduct.success) {
      products.mutate();
      router.push("/");
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

  return products.data ? (
    <>
      <FormStyled onSubmit={handleProductEdit}>
        {productList
          .filter((product) => product._id === productId)
          .map((product) => (
            <StyledEditProduct key={product._id}>
              <LabelStyled>Produkt bearbeiten</LabelStyled>

              <StyledInput
                type="text"
                required
                name="productName"
                defaultValue={product.productName}
                onChange={(event) => setProductName(event.target.value)}
              />
              <p>Maßeinheit</p>
              <StyledSelect
                required
                defaultValue={product.unit}
                onChange={(event) => setUnit(event.target.value)}
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
                defaultValue={product.category}
                onChange={(event) => setCategory(event.target.value)}
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
              <p>Mindestbestand</p>
              <AmountStyle>
                <DecrementButton onClick={() => decrementMinAmount()}>
                  <Remove />
                </DecrementButton>
                <StyledInput
                  required
                  type="number"
                  name="minAmount"
                  value={minAmount}
                  onChange={(event) =>
                    setMinAmount(parseInt(event.target.value))
                  }
                />
                <IncrementButton onClick={() => incrementMinAmount()}>
                  <Add />
                </IncrementButton>
              </AmountStyle>
              <p>aktueller Bestand</p>
              <AmountStyle>
                <DecrementButton onClick={() => decrementActualAmount()}>
                  <Remove />
                </DecrementButton>
                <StyledInput
                  required
                  type="number"
                  pattern="/d*"
                  name="actualAmount"
                  value={actualAmount}
                  onChange={(event) =>
                    setActualAmount(parseInt(event.target.value))
                  }
                />
                <IncrementButton onClick={() => incrementActualAmount()}>
                  <Add />
                </IncrementButton>
              </AmountStyle>
              <p>Maximalbestand</p>
              <AmountStyle>
                <DecrementButton onClick={() => decrementMaxAmount()}>
                  <Remove />
                </DecrementButton>
                <StyledInput
                  required
                  type="number"
                  name="maxAmount"
                  value={maxAmount}
                  onChange={(event) =>
                    setMaxAmount(parseInt(event.target.value))
                  }
                />

                <IncrementButton onClick={() => incrementMaxAmount()}>
                  <Add />
                </IncrementButton>
              </AmountStyle>
            </StyledEditProduct>
          ))}

        <ButtonBar>
          <Link href="/">
            <a>
              <ButtonBack />
            </a>
          </Link>
          <ButtonSave type="submit" />
        </ButtonBar>
      </FormStyled>
    </>
  ) : (
    <div>loading</div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // this page is not available for unauthenticated users
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const StyledEditProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelStyled = styled.label`
  margin: 1rem 0;
  font-size: 40px;
`;
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5.5rem;
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
