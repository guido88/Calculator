import React, { useState } from "react";
import { execute, isOperation, updateOperand } from "../helpers/functions";

const CalculatorContext = React.createContext({
  result: 0,
  calculateResult: (res) => {},
});

export const CalculatorContextProvider = (props) => {
  const [firstOperand, setFirstOperand] = useState("0");
  const [secondOperand, setSecondOperand] = useState("0");
  const [operation, setOperation] = useState(null);
  const [isNewOperation, setIsNewOperation] = useState(false);
  const calculateResultHandler = (res) => {
    if (isOperation(res)) {
      setOperation(res);
    } else if (res === "=") {
      if (firstOperand && secondOperand && operation) {
        setFirstOperand((prevValue) => {
          return execute(prevValue, secondOperand, operation).toString();
        });
      }
      setSecondOperand("0");
      setOperation(null);
      setIsNewOperation(true);
    } else if (res === "AC") {
      setFirstOperand("0");
      setSecondOperand("0");
      setOperation(null);
    } else {
      if (!operation) {
        updateOperand(res, setFirstOperand, isNewOperation);
        setIsNewOperation(false);
      } else {
        updateOperand(res, setSecondOperand, false);
      }
    }
  };

  const displayWhat = firstOperand && operation ? secondOperand : firstOperand;

  const calculatorCtx = {
    result: displayWhat,
    calculateResult: calculateResultHandler,
  };

  return (
    <CalculatorContext.Provider value={calculatorCtx}>
      {props.children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorContext;
