import classes from "./Button.module.css";
import CalculatorContext from "../store/calculator-context";
import { useContext } from "react";

const Button = (props) => {
  const colorClass = props.orange ? classes.orange : "";
  const width = props.value === "0" ? classes.wide : "";
  const calcContext = useContext(CalculatorContext);

  return (
    <button
      className={`${classes.button} ${width} ${colorClass}`}
      onClick={calcContext.calculateResult.bind(null, props.value)}
    >
      {props.value}
    </button>
  );
};

export default Button;
