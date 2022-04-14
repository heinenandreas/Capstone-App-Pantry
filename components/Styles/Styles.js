import styled from "styled-components";

export const AmountStyle = styled.div`
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

export const ButtonBar = styled.div`
  width: 23.44rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const LabelStyled = styled.label`
  margin: 1rem 0;
  font-size: 2.5rem;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5.5rem;
`;

export const StyledInput = styled.input`
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

export const StyledOption = styled.option`
  text-align: center;
  color: var(--lightblue);
`;

export const StyledSelect = styled.select`
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

export const StyledCategory = styled.div`
  margin-bottom: 5.5rem;
`;
