import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  execute,
  isNumber,
  updateOperand,
  updateSymbol,
} from "../helpers/operations";

const initialState = {
  firstOperand: null,
  secondOperand: null,
  operation: null,
  result: null,
  switchOperands: false,
};

const log = (state) => {
  console.log(
    state.firstOperand,
    state.operation,
    state.secondOperand,
    state.result
  );
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addSymbol(state, action) {
      if (action.payload === "." && state.result) {
        state.firstOperand = "0.";
        state.result = null;
      } else {
        if (!state.operation && !state.secondOperand) {
          state.firstOperand = updateSymbol(action.payload, state.firstOperand);
        }

        if (state.operation && state.firstOperand) {
          state.secondOperand = updateSymbol(
            action.payload,
            state.secondOperand
          );
        }
      }

      log(state);
    },

    addNumber(state, action) {
      if (!state.secondOperand && !state.operation) {
        state.firstOperand = updateOperand(action.payload, state.firstOperand);
      }

      if (state.firstOperand && state.operation && !state.result) {
        state.secondOperand = updateOperand(
          action.payload,
          state.secondOperand
        );
      }

      if (state.firstOperand && state.operation && state.result) {
        state.result = null;
        state.switchOperands = true;
        state.secondOperand = updateOperand(
          action.payload,
          state.secondOperand
        );
      }

      log(state);
    },

    addOperation(state, action) {
      if (
        state.firstOperand &&
        state.secondOperand &&
        state.operation &&
        !state.result
      ) {
        const result = execute(
          state.firstOperand,
          state.secondOperand,
          state.operation
        );

        state.firstOperand = result.toString();
        state.secondOperand = null;
        state.result = result.toString();
      }

      state.operation = action.payload;

      log(state);
    },

    reset: (state) => {
      log(state);
      return initialState;
    },

    addEqual(state) {
      if (
        state.firstOperand &&
        !state.secondOperand &&
        state.operation &&
        state.result
      ) {
        const result = execute(
          state.result,
          state.firstOperand,
          state.operation
        );

        state.result = result.toString();
      } else if (state.firstOperand && state.secondOperand && state.operation) {
        const result = execute(
          state.firstOperand,
          state.secondOperand,
          state.operation
        );

        if (!state.switchOperands) {
          state.firstOperand = state.secondOperand;
          state.switchOperands = false;
        }

        state.secondOperand = null;
        state.result = result.toString();
      }

      log(state);
    },
  },
});

const store = configureStore({ reducer: calculatorSlice.reducer });

export const calculatorActions = calculatorSlice.actions;

export default store;

// 5+ 6 = 11 , continuando a premere =  17,23,29...  ovvero al risultato si aggiunge secondo operando
// 5+6 = 11 , premendo un operazione esegui 5+6 e poi con =  esegui RISULTATO OP RISULTATO
// se . dopo = o +/- e %  allora resetta a 0.
// Se 5+6 e = 11 , se NUMERO e poi =  somma  NUMERO a 6 .., e = aggiunge sempre 6 al RIS ( numero dopo = rimpiazza NUMERO e resetta il risultato a nuovo NUM +6)
