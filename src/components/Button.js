import classes from "./TButton.module.css";
import CalculatorContext from "../store/calculator-context";
import { useContext } from "react";
const Button = (props) => {
  const colorClass = props.orange ? classes.orange : "";
  const width = props.value === "0" ? classes.wide : "";
  const buttonClasses = [classes.button,colorClass, width];
  const calcContext = useContext(CalculatorContext);

  return (
    <div className={buttonClasses.join(" ").trim()}>
      <button onClick={calcContext.calculateResult.bind(null, props.value)}>
        {props.value}
      </button>
    </div>
  );
};

export default Button;
