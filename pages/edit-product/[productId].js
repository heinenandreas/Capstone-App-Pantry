import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { units, categories } from "../../itemlist";
import Link from "next/link";
import { ButtonBack, ButtonSave } from "../../components/Buttons/Buttons";
import {
  ButtonBar,
  LabelStyled,
  FormStyled,
  StyledInput,
  StyledOption,
  StyledSelect,
} from "../../components/Styles/Styles";
import { getSession } from "next-auth/react";
import { AmountInput } from "../../components/AmountInputs/AmountInput";
import { Loading } from "../../components/Loading/Loading";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function ProductId() {
  const router = useRouter();
  const { productId } = router.query;
  const product = useSWR(`/api/products/${productId}`, fetcher);
  const products = useSWR(`/api/products`, fetcher);

  const [currentProduct, setCurrentProduct] = useState();

  useEffect(() => {
    if (product.data && !currentProduct) {
      const {
        productName,
        category,
        unit,
        minAmount,
        actualAmount,
        maxAmount,
      } = product.data;
      setCurrentProduct({
        productName,
        category,
        unit,
        minAmount,
        actualAmount,
        maxAmount,
      });
    }
  }, [product.data]);

  console.log({ currentProduct });

  async function handleProductEdit(event) {
    event.preventDefault();

    const response = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(currentProduct),
    });
    const updatedProduct = await response.json();
    if (updatedProduct.success) {
      products.mutate();
      product.mutate();
      router.push("/");
    }
  }

  return product.data && currentProduct ? (
    <>
      <FormStyled onSubmit={handleProductEdit}>
        <StyledEditProduct key={product._id}>
          <LabelStyled>Produkt bearbeiten</LabelStyled>
          <StyledInput
            type="text"
            required
            name="productName"
            value={currentProduct.productName}
            onChange={(event) => {
              setCurrentProduct({
                ...currentProduct,
                productName: event.target.value,
              });
            }}
          />
          <p>Maßeinheit</p>
          <StyledSelect
            required
            name="unit"
            value={currentProduct.unit}
            onChange={(event) => {
              setCurrentProduct({
                ...currentProduct,
                unit: event.target.value,
              });
            }}
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
            value={currentProduct.category}
            onChange={(event) => {
              setCurrentProduct({
                ...currentProduct,
                category: event.target.value,
              });
            }}
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
            value={currentProduct.minAmount}
            onChange={(value) => {
              setCurrentProduct({
                ...currentProduct,
                minAmount: value,
              });
            }}
          />
          <AmountInput
            label="Aktueller Bestand"
            name="actualAmount"
            value={currentProduct.actualAmount}
            onChange={(value) => {
              setCurrentProduct({
                ...currentProduct,
                actualAmount: value,
              });
            }}
          />
          <AmountInput
            label="Maximalbestand"
            name="maxAmount"
            value={currentProduct.maxAmount}
            onChange={(value) => {
              setCurrentProduct({
                ...currentProduct,
                maxAmount: value,
              });
            }}
          />
        </StyledEditProduct>

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
    <Loading />
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
