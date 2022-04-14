import { useState } from "react";
import { Decrement, Increment } from "../Buttons/Buttons";
import { StyledInput, AmountStyle } from "../Styles/Styles";

export function MinAmountInput(props) {
  // const [minAmount, setMinAmount] = useState(0);

  // const decrementMinAmount = () => {
  //   if (minAmount > 0) setMinAmount(minAmount - 1);
  // };

  // const incrementMinAmount = () => {
  //   setMinAmount(minAmount + 1);
  // };

  return (
    <>
      <p>Mindestbestand</p>
      <AmountStyle>
        <Decrement decrement={props.decrementMinAmount} />
        <StyledInput
          required
          type="number"
          name="minAmount"
          placeholder="Min"
          value={props.minAmount}
          onChange={props.typeMinAmount}
        />
        <Increment increment={props.incrementMinAmount} />
      </AmountStyle>
    </>
  );
}
