import { useState } from "react";
import { Decrement, Increment } from "../Buttons/Buttons";
import { StyledInput, AmountStyle } from "../Styles/Styles";

export function AmountInput({ value, label, onChange, name, defaultValue }) {
  const decrementAmount = () => {
    if (value > 0) onChange(value - 1);
  };

  const incrementAmount = () => {
    onChange(value + 1);
  };

  return (
    <>
      <p>{label}</p>
      <AmountStyle>
        <Decrement decrement={decrementAmount} />
        <StyledInput
          required
          type="number"
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={(event) => {
            onChange(parseInt(event.target.value));
          }}
        />
        <Increment increment={incrementAmount} />
      </AmountStyle>
    </>
  );
}
