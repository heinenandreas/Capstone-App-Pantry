import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";
import { ButtonBack, ButtonDelete } from "../../components/Buttons/Buttons";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function DeleteId() {
  const router = useRouter();
  const { deleteId } = router.query;
  const products = useSWR("/api/products", fetcher);
  const productList = products.data;

  async function handleDeleteItemClick(id) {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const deletedProduct = await response.json();
    if (deletedProduct.success) {
      products.mutate();
      router.push("/");
    }
  }

  return products.data ? (
    <FormStyled>
      {productList
        .filter((product) => product._id === deleteId)
        .map((product) => (
          <Container key={deleteId}>
            <LabelStyled>Produkt löschen</LabelStyled>
            <StyledDeleteQuestion>
              <StyledQuestion>Möchtest du </StyledQuestion>
              <StyledProductname>{product.productName} </StyledProductname>
              <StyledQuestion>wirklich löschen?</StyledQuestion>
            </StyledDeleteQuestion>

            <ButtonBar>
              <Link href="/">
                <a>
                  <ButtonBack />
                </a>
              </Link>

              <StyledButton onClick={() => handleDeleteItemClick(product._id)}>
                <ButtonDelete />
              </StyledButton>
            </ButtonBar>
          </Container>
        ))}
    </FormStyled>
  ) : (
    <div>loading</div>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledQuestion = styled.p`
  font-size: 1.5rem;
`;

const StyledProductname = styled.p`
  color: var(--pink);
  font-size: 2rem;
  margin: 1rem;
`;

const StyledDeleteQuestion = styled.div`
  width: 18rem;
  height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  //border: 3px solid var(--pink);
  border-radius: 25px;
  -moz-box-shadow: 1px 1px 3px 2px #d6007e;
  -webkit-box-shadow: 1px 1px 3px 2px #d6007e;
  box-shadow: 1px 1px 3px 2px #d6007e;
`;

const StyledButton = styled.button`
  border: none;
  background-color: white;
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

const ButtonBar = styled.div`
  width: 23.44rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export default DeleteId;
