import { useState } from "react";
import { units, categories } from "../itemlist";
import { ButtonBack, ButtonSave } from "../components/Buttons/Buttons";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
  ButtonBar,
  LabelStyled,
  FormStyled,
  StyledInput,
  StyledOption,
  StyledSelect,
} from "../components/Styles/Styles";
import { AmountInput } from "../components/AmountInputs/AmountInput";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function CreateProduct() {
  const products = useSWR("/api/products", fetcher);
  const router = useRouter();
  const { data: session } = useSession();

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
        userId: session.user.id,
      }),
    });
    const createdProduct = await response.json();
    if (createdProduct.success) {
      products.mutate();
      router.push("/");
    }
  }

  return (
    <>
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
          name="unit"
          value={unit}
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
          name="category"
          value={category}
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
        <AmountInput
          label="Mindestbestand"
          name="minAmount"
          value={minAmount}
          onChange={(event) => setMinAmount(event)}
        />
        <AmountInput
          label="Aktueller Bestand"
          name="actualAmount"
          value={actualAmount}
          onChange={(event) => setActualAmount(event)}
        />
        <AmountInput
          label="Mindestbestand"
          name="maxAmount"
          value={maxAmount}
          onChange={(event) => setMaxAmount(event)}
        />

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

export default CreateProduct;
