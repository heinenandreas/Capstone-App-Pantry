import styled from "styled-components";

export const AmountStyle = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0.4rem 0;
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

export const ButtonBar = styled.div`
  width: 23.44rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1rem;
`;

export const LabelStyled = styled.label`
  margin: 1.5rem 0 0.8rem 0;
  font-size: 2.5rem;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5.5rem;
`;

export const StyledInput = styled.input`
  text-align: center;
  border-radius: 0.6rem;
  border: 2px solid var(--darkblue);
  width: 12rem;
  height: 2rem;
  margin: 0.2rem 0 0.6rem 0;

  &::placeholder {
    text-align: center;
    color: var(--lightblue);
  }
`;

export const StyledOption = styled.option`
  color: var(--lightblue);
`;

export const StyledSelect = styled.select`
  text-align: center;
  border-radius: 0.6rem;
  border: 2px solid var(--darkblue);
  width: 12rem;
  height: 2rem;
  margin: 0.2rem 0 0.7rem 0;

  &::placeholder {
    text-align: center;
    color: var(--lightblue);
  }
`;

export const StyledCategory = styled.div`
  margin-bottom: 5.5rem;
`;

export const InputName = styled.p`
  margin: 0rem;
  padding: 0;
`;

export const AmountBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.2rem;
`;

export const ElementContainer = styled.div`
  width: 17rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  border-top: 2px solid var(--lightblue);
`;

export const StyledListName = styled.p`
  width: 8rem;
  color: var(--darkblue);
  font-size: 1.1rem;
  padding-left: 1rem;
`;

export const StyledListUnit = styled.p`
  color: var(--darkblue);
  font-size: 0.625rem;
`;
