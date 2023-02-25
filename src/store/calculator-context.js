import React, { useReducer } from "react";
import { execute, isOperation, updateOperand } from "../helpers/operations.js";

const CalculatorContext = React.createContext({
  result: 0,
  calculateResult: (res) => {},
});

const initialState = {
  firstOperand: "0",
  secondOperand: "0",
  operation: null,
  isNewOperation: false,
};

const calculationReducer = (state, action) => {
  console.log(state, action);

  if (action.type === "NUMBER") {
    if (!state.operation) {
      return {
        ...state,
        firstOperand: updateOperand(
          action.value,
          state.firstOperand,
          state.isNewOperation
        ),
        isNewOperation: false,
      };
    } else {
      return {
        ...state,
        secondOperand: updateOperand(
          action.value,
          state.secondOperand,
          state.isNewOperation
        ),
      };
    }
  }

  if (action.type === "OPERATION") {
    return {
      ...state,
      operation: action.value,
    };
  }

  if (action.type === "=") {
    if (state.firstOperand && state.secondOperand && state.operation) {
      return {
        firstOperand: execute(
          state.firstOperand,
          state.secondOperand,
          state.operation
        ).toString(),
        secondOperand: "0",
        operation: null,
        isNewOperation: true,
      };
    }
  }

  if (action.type === "AC") {
    return initialState;
  }
};

export const CalculatorContextProvider = (props) => {
  const [calculatorState, dispatchCalculator] = useReducer(
    calculationReducer,
    initialState
  );

  const { firstOperand, secondOperand, operation } = calculatorState;

  const calculateResultHandler = (res) => {
    if (isOperation(res)) {
      dispatchCalculator({ type: "OPERATION", value: res });
    } else if (res === "=") {
      dispatchCalculator({ type: "=" });
    } else if (res === "AC") {
      dispatchCalculator({ type: "AC" });
    } else {
      dispatchCalculator({ type: "NUMBER", value: res });
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
