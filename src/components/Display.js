import classes from "./Display.module.css";
import { useSelector } from "react-redux";

const Display = () => {
  const calculator = useSelector((state) => state);

  const display =
    calculator.firstOperand && !calculator.secondOperand && !(+calculator.result) > 0
      ? calculator.firstOperand
      : calculator.secondOperand && calculator.firstOperand
      ? calculator.secondOperand
      : calculator.result ? calculator.result : "0";

  return (
    <div className={classes.display}>
      <div>{display}</div>
    </div>
  );
};

export default Display;
