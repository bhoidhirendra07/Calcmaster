
    const input = document.querySelector("input");

    // Handle keyboard input
    document.addEventListener("keydown", function(e) {
        if ((e.key >= '0' && e.key <= '9') || "+-*/.%.".includes(e.key)) {
            input.value += e.key;
        } else if (e.key === "Enter") {
            input.value = eval(input.value);
        } else if (e.key === "Backspace") {
            input.value = input.value.slice(0, -1);
        } else if (e.key === "Delete") {
            input.value = "";
        }
    });

    // Handle button clicks
    document.querySelectorAll("button").forEach(button => {
        button.onclick = () => {
            const val = button.textContent;
            if (val === "=") {
                input.value = eval(input.value);
            } else if (val === "AC") {
                input.value = "";
            } else if (val === "DEL") {
                input.value = input.value.slice(0, -1);
            } else {
                input.value += val;
            }
        };
    });
