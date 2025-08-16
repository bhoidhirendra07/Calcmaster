const input = document.querySelector("input");
const operators = ["+", "-", "*", "/", "%", "."];


function appendValue(value) {
    const currentValue = input.value;
    const lastChar = currentValue.slice(-1); 

    if (currentValue === "" && ["+", "*", "/", "%", "."].includes(value)) {
        return;
    }
    
    if (operators.includes(lastChar) && operators.includes(value)) {
        input.value = currentValue.slice(0, -1) + value;
        return;
    }
    
    if (value === "." && currentValue.split(/[\+\-\*\/\%]/).pop().includes(".")) {
        return;
    }

    input.value += value;
}

function evaluateExpression() {
    let exp = input.value;
    exp = exp.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
    try {
        input.value = eval(exp);
    } catch {
        input.value = "Error";
    }
}

// code for keyboard support
document.addEventListener("keydown", function(e) {
    if ((e.key >= "0" && e.key <= "9") || operators.includes(e.key)) {
        appendValue(e.key);
    } else if (e.key === "Enter") {
        evaluateExpression();
    } else if (e.key === "Backspace") {
        input.value = input.value.slice(0, -1);
    } else if (e.key === "Delete") {
        input.value = "";
    }
});

// Button clicks
document.querySelectorAll("button").forEach(button => {
    button.onclick = () => {
        const val = button.textContent;
        if (val === "=") {
            evaluateExpression();
        } else if (val === "AC") {
            input.value = "";
        } else if (val === "DEL") {
            input.value = input.value.slice(0, -1);
        } else {
            appendValue(val);
        }
    };
});
