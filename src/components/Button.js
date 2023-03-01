import classes from "./Button.module.css";
import { useDispatch } from "react-redux";
import { calculatorActions } from "../store/calculatorStore";
import { isSymbol, isNumber, isOperation } from "../helpers/operations";

const Button = (props) => {
  const colorClass = props.orange ? classes.orange : "";
  const width = props.value === "0" ? classes.wide : "";

  const dispatch = useDispatch();

  const calculateResultHandler = () => {
    if (props.value === "=") {
      dispatch(calculatorActions.addEqual());
    } else if (props.value === "AC") {
      dispatch(calculatorActions.reset());
    } else if (isNumber(props.value)) {
      dispatch(calculatorActions.addNumber(props.value));
    } else if (isSymbol(props.value)) {
      dispatch(calculatorActions.addSymbol(props.value));
    } else if (isOperation(props.value)) {
      dispatch(calculatorActions.addOperation(props.value));
    }
  };

  return (
    <button
      className={`${classes.button} ${width} ${colorClass}`}
      onClick={calculateResultHandler}
    >
      {props.value}
    </button>
  );
};

export default Button;
