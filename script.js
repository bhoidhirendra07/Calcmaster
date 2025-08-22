const input = document.querySelector("input");
const operators = ["+", "-", "*", "/", "%", "."];

function formatNumber(num) {
  if (isNaN(num) || num === "" || num === null) return "";
  let [intPart, decimalPart] = num.toString().split(".");
  // Proper Indian number system formatting
  let lastThree = intPart.slice(-3);
  let otherNumbers = intPart.slice(0, -3);
  if (otherNumbers !== "") {
    otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    intPart = otherNumbers + "," + lastThree;
  }
  return decimalPart ? `${intPart}.${decimalPart}` : intPart;
}

// Remove commas for evaluation
function unformatNumber(str) {
  return str.replace(/,/g, "");
}

// Format full expression with commas for each number
function formatExpression(expr) {
  return expr.replace(/\d+(\.\d+)?/g, (match) => formatNumber(match));
}

function appendValue(value) {
  let currentValue = unformatNumber(input.value);
  const lastChar = currentValue.slice(-1);
  if (currentValue === "" && ["+", "*", "/", "%", "."].includes(value)) {
    return;
  }
  if (operators.includes(lastChar) && operators.includes(value)) {
    currentValue = currentValue.slice(0, -1) + value;
  } else if (
    value === "." &&
    currentValue
      .split(/[\+\-\*\/\%]/)
      .pop()
      .includes(".")
  ) {
    return;
  } else {
    currentValue += value;
  }
  input.value = formatExpression(currentValue);
  input.scrollLeft = input.scrollWidth;
}

function evaluateExpression() {
  let exp = unformatNumber(input.value);
  exp = exp.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
  try {
    const result = eval(exp);
    input.value = formatNumber(result);
    input.scrollLeft = input.scrollWidth;
  } catch {
    input.value = "Error";
  }
}

// code for keyboard support
document.addEventListener("keydown", function (e) {
  if ((e.key >= "0" && e.key <= "9") || operators.includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter") {
    evaluateExpression();
  } else if (e.key === "Backspace") {
    input.value = formatExpression(unformatNumber(input.value).slice(0, -1));
    input.scrollLeft = input.scrollWidth;
  } else if (e.key === "Delete") {
    input.value = "";
  }
});

// Button clicks
document.querySelectorAll("button").forEach((button) => {
  button.onclick = () => {
    const val = button.textContent;
    if (val === "=") {
      evaluateExpression();
    } else if (val === "AC") {
      input.value = "";
    } else if (val === "DEL") {
      input.value = formatExpression(unformatNumber(input.value).slice(0, -1));
      input.scrollLeft = input.scrollWidth;
    } else {
      appendValue(val);
    }
  };
});
