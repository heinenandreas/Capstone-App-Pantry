import styled from "styled-components";

function ItemList() {
  return (
    <AddEditCard>
      <h1>Neues Produkt</h1>
      <form>
        <label></label>
        <input placeholder="Produktname"></input>
        <input placeholder="Maß z.B. kg, Pkg, Flasche, Stk"></input>
        <input placeholder="Einheit"></input>
        <DecrementButton />
        <p>min</p>
        <IncrementButton />
        <DecrementButton /> <p>aktuell</p>
        <IncrementButton />
        <DecrementButton /> <p>max</p>
        <IncrementButton />
      </form>
    </AddEditCard>
  );
}

const IncrementButton = styled.button`
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

  &:hover {
    font-size: 20px;
    transform: scale(1.1) rotate(90deg);
    background-color: var(--green);
    border: 2px solid var(--lightgreen);
  }
`;

const DecrementButton = styled.button`
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

  &:hover {
    font-size: 20px;
    transform: scale(1.1) rotate(180deg);
    background-color: var(--pink);
    border: 2px solid var(--neonpink);
  }
`;
