//Currently  we update operation each time we click , should we wait after operation is executed?
// Chained operations before clicking = not allowed atm
import Big from "big.js";

export const execute = (o1, o2, operation) => {
  if (o1 === 0 && o2 === 0) return 0;

  const first = Big(o1);
  const second = Big(o2);

  switch (operation) {
    case "+":
      return first.plus(second);
    case "-":
      return first.minus(second);
    case "X":
      return first.mul(second);
    case "/":
      if (o2 === "0") {
        return 0;
      }
      return first.div(second);
    default:
      break;
  }
};

export const isNumber = (number) => !isNaN(number);

export const isOperation = (operation) =>
  operation === "+" ||
  operation === "-" ||
  operation === "X" ||
  operation === "/";

export const updateOperand = (res, operand, isNewOperation) => {
  if (isNumber(res)) {
    if (operand === "0" || isNewOperation) {
      return res;
    }
    return operand.concat(res).toString();
  }

  if (res === ".") {
    if (operand.includes(".")) {
      return res;
    }
    return operand.concat(res).toString();
  }

  if (res === "+/-") {
    return (-operand).toString();
  }

  if (res === "%") {
    return Big(operand).div(Big(100)).toString();
  }
};
