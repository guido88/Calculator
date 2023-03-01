import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  executeOperation,
  updateOperandWithNumber,
  updateOperandWithSymbol,
} from "../helpers/operations";

const initialState = {
  firstOperand: null,
  secondOperand: null,
  operation: null,
  result: null,
  switchOperands: false,
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addSymbol(state, action) {
      if (action.payload === "." && state.result) {
        state.firstOperand = "0.";
        state.operation = null;
        state.result = null;
      } else {
        if (!state.operation && !state.secondOperand) {
          state.firstOperand = updateOperandWithSymbol(
            action.payload,
            state.firstOperand
          );
        }

        if (state.operation && state.firstOperand) {
          state.secondOperand = updateOperandWithSymbol(
            action.payload,
            state.secondOperand
          );
        }
      }
    },

    addNumber(state, action) {
      if (!state.secondOperand && !state.operation) {
        state.firstOperand = updateOperandWithNumber(
          action.payload,
          state.firstOperand
        );
      }

      if (state.firstOperand && state.operation && !state.result) {
        state.secondOperand = updateOperandWithNumber(
          action.payload,
          state.secondOperand
        );
      }

      if (state.firstOperand && state.operation && state.result) {
        state.result = null;
        state.switchOperands = true;
        state.secondOperand = updateOperandWithNumber(
          action.payload,
          state.secondOperand
        );
      }
    },

    addOperation(state, action) {
      if (
        state.firstOperand &&
        state.secondOperand &&
        state.operation &&
        !state.result
      ) {
        const result = executeOperation(
          state.firstOperand,
          state.secondOperand,
          state.operation
        );

        state.firstOperand = result.toString();
        state.secondOperand = null;
        state.result = result.toString();
      }

      state.operation = action.payload;
    },

    reset: () => initialState,

    equal(state) {
      if (
        state.firstOperand &&
        !state.secondOperand &&
        state.operation &&
        state.result
      ) {
        const result = executeOperation(
          state.result,
          state.firstOperand,
          state.operation
        );

        state.result = result.toString();
      } else if (state.firstOperand && state.secondOperand && state.operation) {
        const result = executeOperation(
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
    },
  },
});

const store = configureStore({ reducer: calculatorSlice.reducer });

export const calculatorActions = calculatorSlice.actions;
export default store;
