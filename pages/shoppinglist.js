import useSWR from "swr";
import styled from "styled-components";
import Add from "../src/Icons/Add.svg";
import Remove from "../src/Icons/Remove.svg";
import { getSession } from "next-auth/react";
import { HighlightActualAmountPositive } from "../components/HighlightAmount/HighlightAmount";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function Shoppinglist() {
  const products = useSWR("/api/products", fetcher);
  const productList = products.data;

  async function handleProductAmount(id, actualAmount) {
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ actualAmount: actualAmount }),
    });
    const updatedProduct = await response.json();
    if (updatedProduct.success) {
      products.mutate();
    }
  }

  function handleClickDecrement(product) {
    if (product.actualAmount > 0) {
      handleProductAmount(product._id, product.actualAmount - 1);
    }
  }

  function handleClickIncrement(product) {
    handleProductAmount(product._id, product.actualAmount + 1);
  }

  return products.data ? (
    <StyledCategory>
      <ShoppinglistStyled>
        <CategoryNameStyled>Shoppinglist</CategoryNameStyled>
      </ShoppinglistStyled>
      <StyledList>
        {productList
          .filter((product) => product.actualAmount < product.maxAmount)
          .map((product) => (
            <StyledItem key={product._id}>
              <StyledListName>{product.productName}</StyledListName>
              <ElementContainer>
                <DecrementButton
                  type="button"
                  amount={product.actualAmount}
                  onClick={() => handleClickDecrement(product)}
                >
                  <Remove />
                </DecrementButton>
                <HighlightActualAmountPositive
                  product={product}
                  actualAmount={product.actualAmount}
                  maxAmount={product.maxAmount}
                />
                <IncrementButton
                  type="button"
                  key={product.name}
                  amount={product.actualAmount}
                  onClick={() => handleClickIncrement(product)}
                >
                  <Add />
                </IncrementButton>
                <StyledListMaxAmount>{product.maxAmount}</StyledListMaxAmount>
                <StyledListUnit>{product.unit}</StyledListUnit>
              </ElementContainer>
            </StyledItem>
          ))}
      </StyledList>
    </StyledCategory>
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

const StyledListMaxAmount = styled.p`
  color: var(--darkblue);
  font-size: 30px;
`;

const CategoryNameStyled = styled.h3`
  font-size: 1.6rem;
  margin: 0;
  padding-left: 0.5rem;
  color: var(--darkblue);
`;

const ShoppinglistStyled = styled.div`
  height: 3rem;
  width: 95vw;
  background-color: var(--lightgreen);
  border-radius: 0 1em 0 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  border-bottom: 3px solid var(--green);
`;

const StyledList = styled.div`
  width: 95vw;
  border: 2px solid var(--darkblue);
  border-top: 0px;
  border-left: 0px;
  border-radius: 0 0 22px 0;
  background-color: #ffebd9;
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  border-top: 2px solid var(--lightblue);
`;
const StyledListName = styled.p`
  color: var(--darkblue);
  font-size: 1.25rem;
  padding-left: 1rem;
`;
const StyledListUnit = styled.p`
  color: var(--darkblue);
  font-size: 0.625rem;
`;

const IncrementButton = styled.button`
  background-color: var(--lightgreen);
  border: 2px solid var(--green);
  border-radius: 999px;
  height: 1.87rem;
  width: 1.87rem;
  transition: 0.2s;
  font-size: 1.87rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-size: 1.25rem;
    transform: scale(1.1) rotate(90deg);
    background-color: var(--green);
    border: 2px solid var(--lightgreen);
  }
`;

const DecrementButton = styled.button`
  background-color: var(--neonpink);
  border: 2px solid var(--pink);
  border-radius: 999px;
  height: 1.87rem;
  width: 1.87rem;
  transition: 0.2s;
  font-size: 1.87rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-size: 1.25rem;
    transform: scale(1.1) rotate(180deg);
    background-color: var(--pink);
    border: 2px solid var(--neonpink);
  }
`;

const StyledCategory = styled.div`
  margin-bottom: 5.5rem;
`;

const ElementContainer = styled.div`
  width: 16rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 0.2rem;
`;

export default Shoppinglist;
