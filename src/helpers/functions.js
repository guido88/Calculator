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

export const updateOperand = (res, setOperand, isNewOperation) => {
  if (isNumber(res)) {
    setOperand((prevResult) => {
      if (prevResult === "0" || isNewOperation) {
        return res;
      }
      return prevResult.concat(res).toString();
    });
  }

  if (res === ".") {
    setOperand((prevResult) => {
      if (prevResult.includes(".")) {
        return res;
      }
      return prevResult.concat(res).toString();
    });
  }

  if (res === "+/-") {
    setOperand((prevResult) => {
      return (-prevResult).toString();
    });
  }

  if (res === "%") {
    setOperand((prevResult) => {
      return Big(prevResult).div(Big(100)).toString();
    });
  }
};
