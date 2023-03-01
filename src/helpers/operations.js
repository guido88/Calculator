import Big from "big.js";

export const isNumber = (number) => !isNaN(number);

export const isOperation = (operation) =>
  operation === "+" ||
  operation === "-" ||
  operation === "X" ||
  operation === "/";

export const isSymbol = (operation) =>
  operation === "+/-" || operation === "." || operation === "%";

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

export const updateSymbol = (res, operand) => {
  if (res === ".") {
    if (!operand) {
      return "0.";
    }
    if (operand.includes(".")) {
      return operand;
    }
    return operand.concat(res).toString();
  }

  if (res === "+/-") {
    return (-operand).toString();
  }

  if (res === "%") {
    if (!operand) {
      return "0";
    }
    return Big(operand).div(Big(100)).toString();
  }
};

export const updateOperand = (res, operand) => {
  if (!operand || operand === "0") {
    return res;
  }
  return operand.concat(res).toString();
};
