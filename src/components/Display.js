import { useContext } from "react";
import CalculatorContext from "../store/calculator-context";
import classes from "./Display.module.css";

const Display = () => {
  const calcContext = useContext(CalculatorContext);

  return (
    <div className={classes.display}>
      <div>{calcContext.result}</div>
    </div>
  );
};

export default Display;
