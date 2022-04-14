NEXTAUTH_URL=https://capstone-project-kappa-self.vercel.app/

NEXTAUTH_URL=http://localhost:3000/

import { useState } from "react";
import { units, categories } from "../itemlist";
import styled from "styled-components";
import {
  ButtonBack,
  ButtonSave,
  Decrement,
  Increment,
} from "../components/Buttons/Buttons";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
  AmountStyle,
  ButtonBar,
  LabelStyled,
  FormStyled,
  StyledInput,
  StyledOption,
  StyledSelect,
} from "../components/Styles/Styles";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function AddEditCard({ product }) {
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
          placeholder="Maß z.B. kg, Pkg, Flasche, Stk"
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
        <p>Mindestbestand</p>
        <AmountStyle>
          <Decrement decrement={decrementMinAmount} />
          <StyledInput
            required
            type="number"
            name="minAmount"
            placeholder="Min"
            value={minAmount}
            onChange={(event) => setMinAmount(parseInt(event.target.value))}
          />
          <Increment increment={incrementMinAmount} />
        </AmountStyle>
        <p>aktueller Bestand</p>
        <AmountStyle>
          <Decrement decrement={decrementActualAmount} />
          <StyledInput
            required
            type="number"
            name="actualAmount"
            placeholder="Aktuell"
            value={actualAmount}
            onChange={(event) => setActualAmount(parseInt(event.target.value))}
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
            placeholder="Max"
            value={maxAmount}
            onChange={(event) => setMaxAmount(parseInt(event.target.value))}
          />
          <Increment increment={incrementMaxAmount} />
        </AmountStyle>
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
    // <>
    //   <FormStyled onSubmit={handleCreateProduct}>
    //     <LabelStyled>Neues Produkt</LabelStyled>
    //     <p>Produktname</p>
    //     <StyledInput
    //       type="text"
    //       required
    //       name="productName"
    //       placeholder="Produktname"
    //       value={productName}
    //       onChange={(event) => setProductName(event.target.value)}
    //     />
    //     <p>Maßeinheit</p>
    //     <StyledSelect
    //       required
    //       placeholder="Maß z.B. kg, Pkg, Flasche, Stk"
    //       value={unit}
    //       onChange={(event) => setUnit(event.target.value)}
    //     >
    //       <StyledOption value="" disabled hidden>
    //         Wähle eine Einheit
    //       </StyledOption>

    //       {units.map((unit) => {
    //         return (
    //           <StyledOption key={unit.name} value={unit.name}>
    //             {unit.name}
    //           </StyledOption>
    //         );
    //       })}
    //     </StyledSelect>
    //     <p>Kategorie</p>
    //     <StyledSelect
    //       required
    //       value={category}
    //       onChange={(event) => setCategory(event.target.value)}
    //     >
    //       <StyledOption value="" disabled hidden>
    //         Wähle eine Kategorie
    //       </StyledOption>
    //       {categories.map((category) => {
    //         return (
    //           <StyledOption key={category.name} value={category.name}>
    //             {category.name}
    //           </StyledOption>
    //         );
    //       })}
    //     </StyledSelect>
    //     <p>Mindestbestand</p>
    //     <AmountStyle>
    //       <Decrement decrement={decrementMinAmount} />
    //       <StyledInput
    //         required
    //         type="number"
    //         name="minAmount"
    //         placeholder="Min"
    //         value={minAmount}
    //         onChange={(event) => setMinAmount(parseInt(event.target.value))}
    //       />
    //       <Increment increment={incrementMinAmount} />
    //     </AmountStyle>
    //     <p>aktueller Bestand</p>
    //     <AmountStyle>
    //       <Decrement decrement={decrementActualAmount} />
    //       <StyledInput
    //         required
    //         type="number"
    //         name="actualAmount"
    //         placeholder="Aktuell"
    //         value={actualAmount}
    //         onChange={(event) => setActualAmount(parseInt(event.target.value))}
    //       />
    //       <Increment increment={incrementActualAmount} />
    //     </AmountStyle>
    //     <p>Maximalbestand</p>
    //     <AmountStyle>
    //       <Decrement decrement={decrementMaxAmount} />
    //       <StyledInput
    //         required
    //         type="number"
    //         name="maxAmount"
    //         placeholder="Max"
    //         value={maxAmount}
    //         onChange={(event) => setMaxAmount(parseInt(event.target.value))}
    //       />
    //       <Increment increment={incrementMaxAmount} />
    //     </AmountStyle>
    //     <ButtonBar>
    //       <Link href="/">
    //         <a>
    //           <ButtonBack />
    //         </a>
    //       </Link>
    //       <ButtonSave type="submit" />
    //     </ButtonBar>
    //   </FormStyled>
    // </>
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

export default AddEditCard;
