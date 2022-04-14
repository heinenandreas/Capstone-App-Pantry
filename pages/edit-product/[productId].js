import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { useState } from "react";
import { units, categories } from "../../itemlist";
import Link from "next/link";
import {
  ButtonBack,
  ButtonSave,
  Decrement,
  Increment,
} from "../../components/Buttons/Buttons";
import {
  AmountStyle,
  ButtonBar,
  LabelStyled,
  FormStyled,
  StyledInput,
  StyledOption,
  StyledSelect,
} from "../../components/Styles/Styles";
import { getSession } from "next-auth/react";
import { MinAmountInput } from "../../components/AmountInputs/MinAmountInput";

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

  const typeMinAmount = (event) => {
    setMinAmount(parseInt(event.target.value));
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
              <MinAmountInput
                decrementMinAmount={decrementMinAmount}
                incrementMinAmount={incrementMinAmount}
                typeMinAmount={typeMinAmount}
                myvalue={minAmount}
              />
              {/* <p>Mindestbestand</p>
              <AmountStyle>
                <Decrement decrement={decrementMinAmount} />
                <StyledInput
                  required
                  type="number"
                  name="minAmount"
                  value={minAmount}
                  onChange={(event) =>
                    setMinAmount(parseInt(event.target.value))
                  }
                />
                <Increment increment={incrementMinAmount} />
              </AmountStyle> */}
              <p>aktueller Bestand</p>
              <AmountStyle>
                <Decrement decrement={decrementActualAmount} />
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
                <Increment increment={incrementActualAmount} />
              </AmountStyle>
              <p>Maximalbestand</p>
              <AmountStyle>
                <Decrement decrement={decrementMaxAmount} />
                <StyledInput
                  required
                  type="number"
                  name="maxAmount"
                  value={maxAmount}
                  onChange={(event) =>
                    setMaxAmount(parseInt(event.target.value))
                  }
                />
                <Increment increment={incrementMaxAmount} />
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

export default ProductId;
