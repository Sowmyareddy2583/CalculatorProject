const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let output = "";
const specialChars = ["/", "+", "-", "*"];

const calculate = (btnValue) => {
  if (btnValue === "=" && output !== "") {
    if (output.replace(/[^0-9]/g, "").length > 6) {
      output = "Error";
    } else {
      // Add spaces around operators and evaluate the expression
      const spacedOutput = output.replace(/([+\-*/])/g, " $1 ");
      try {
        output = eval(spacedOutput);
      } catch (error) {
        output = "Error";
      }
    }
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else if (output === "0" && !specialChars.includes(btnValue)) {
    output = btnValue;
  } else {
    if (output === "" && specialChars.includes(btnValue)) return;
    if (output.replace(/[^0-9]/g, "").length >= 6) {
      alert("you're only allowed to enter 6 digits");
      return;
    }

    // Check for consecutive operators and prevent adding more operators
    if (
      specialChars.includes(btnValue) &&
      specialChars.includes(output[output.length - 1])
    )
    {
      alert("Consecutive operators are not allowed");
      return;
    }


    output += btnValue;
  }

  display.value = output;
};

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    calculate(event.target.value);
  });
});

const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", () => {
  output = "0";
  display.value = output;
});
