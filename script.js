// Read Function
function operate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    } else {
        return "Error";
    }
}

// Math Function    
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Div by zero error!";
    }
    return a / b;
}

// Buttons function
const digitsAndStuff = [
    {id : 'decimal', num : '.'},
    {id : 'zero', num : 0},
    {id : 'one' , num : 1},
    {id : 'two', num : 2},
    {id : 'three', num : 3},
    {id : 'four', num : 4},
    {id : 'five' , num : 5},
    {id : 'six', num : 6},
    {id : 'seven', num : 7},
    {id : 'eight', num : 8},
    {id : 'nine', num : 9},
    {id : 'mul', num : "*"},
    {id : 'div', num : "/"},
    {id : 'plus', num : "+"},
    {id : 'minus', num : "-"}
];

const display = document.querySelector(".upper");
const ansDisplay = document.querySelector(".lower");
const btnPress = document.querySelectorAll(".btn");

let ans = 0;
let operating = false;
let doubling = false;
const sign = ['+', '-', '*', '/'];

btnPress.forEach(btn => {btn.addEventListener("click", () => {
    if (digitsAndStuff.find(digit => digit.id === btn.id)) {

        // If there is no previous ANS, function normally
        if (ansDisplay.textContent === "") {

            // Not already in an operation
            if ((btn.id === "mul" || btn.id === "div" ||btn.id === "plus" ||btn.id === "minus") && operating === false) {
                operating = true;
                display.textContent += `${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
            } 
            
            // Working on this
            else if ((btn.id === "mul" || btn.id === "div" ||btn.id === "plus" ||btn.id === "minus") && operating === true) {
                const index = [...display.textContent].findIndex(char => sign.includes(char));
                let firstNum = display.textContent.substring(0, index);
                let secondNum = display.textContent.substring(index + 1, display.textContent.length);
                let operater = display.textContent.charAt(index);

                if (operating === true && (firstNum === "" || secondNum === "")) {
                    operating = false;
                    doubling = true;
                    display.textContent += `${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
                } else {
                    console.log('no');
                    // Should not jump into this if there is an operator already
                    ansDisplay.textContent = operate((firstNum === "ANS" ? ans : firstNum), operater, (secondNum === "ANS" ? ans : secondNum));
                    ans = parseFloat(ansDisplay.textContent);
                    if (!Number.isNaN(ans)) {
                        display.textContent = `ANS${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
                    } else {
                        display.textContent = "";
                        ansDisplay.textContent = (Number.isNaN(ans)) ? "Div by zero error!" : ans;
                        ans = NaN;
                        operating = false;
                    }
                }
            } else {
                display.textContent += `${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
                ansDisplay.textContent = "";
            }
        }

        // If there are previous ans, save it and do calculation accordingly
        else {
            // If not already in an operation
            if ((btn.id === "mul" || btn.id === "div" ||btn.id === "plus" ||btn.id === "minus") && operating === false) {
                operating = true;
                display.textContent = `ANS${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
                ansDisplay.textContent = "";
            } 
            
            // Working on this
            else if ((btn.id !== "mul" && btn.id !== "div" && btn.id !== "plus" && btn.id !== "minus") && operating === true){
                display.textContent += `${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
            }
            else if ((btn.id === "mul" || btn.id === "div" ||btn.id === "plus" ||btn.id === "minus") && operating === true) {
                const index = [...display.textContent].findIndex(char => sign.includes(char));
                let firstNum = display.textContent.substring(0, index);
                let secondNum = display.textContent.substring(index + 1, display.textContent.length);
                let operater = display.textContent.charAt(index);

                if (firstNum === "" || secondNum === "") {
                    ansDisplay.textContent === "Can't do that!";
                } else {
                    ansDisplay.textContent = operate((firstNum === "ANS" ? ans : firstNum), operater, (secondNum === "ANS" ? ans : secondNum));
                    ans = parseFloat(ansDisplay.textContent);

                    display.textContent = `ANS${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
                    ansDisplay.textContent = ans;
                }
            }

            else {
                display.textContent = `${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
                ansDisplay.textContent = "";
            }
        }
    }

    // The rest of the buttons
    else if (btn.id === "ac") {
        operating = false;
        display.textContent = "";
        ansDisplay.textContent = "";
        ans = 0;
    } else if (btn.id === "del") {
        if (ansDisplay.textContent === "") {
            if (display.textContent.charAt(display.textContent.length - 1) === "S") {
                display.textContent = `${display.textContent.substring(0, display.textContent.length - 3)}`;
            } else {
                display.textContent = `${display.textContent.substring(0, display.textContent.length - 1)}`;
            }
            ansDisplay.textContent = "";
        } 
        // ??? TESTING
        else if (ansDisplay.textContent !== "" && operating === true) {
            if (display.textContent.charAt(display.textContent.length - 1) === "S") {
                display.textContent = `${display.textContent.substring(0, display.textContent.length - 3)}`;
            } else {
                display.textContent = `${display.textContent.substring(0, display.textContent.length - 1)}`;
            }
            ansDisplay.textContent = "";
            operating = false;
        }
    } else if (btn.id === "equals") {
        if (doubling !== true) {
            const index = [...display.textContent].findIndex(char => sign.includes(char));
            let firstNum = display.textContent.substring(0, index);
            let secondNum = display.textContent.substring(index + 1, display.textContent.length);
            let operater = display.textContent.charAt(index);
            ansDisplay.textContent = operate((firstNum === "ANS" ? ans : firstNum), operater, (secondNum=== "ANS" ? ans : secondNum));
            ans = parseFloat(ansDisplay.textContent);
            operating = false;
        } else if (doubling == true) {
            ansDisplay.textContent = "Too Advanced!";
            ans = NaN;
            doubling = false;
        }
    } else if (btn.id === "ans") {
        if (ansDisplay.textContent !== "" && operating === false) {
            display.textContent = "ANS";
            ansDisplay.textContent = "";
        } else if (ansDisplay.text !== "" && operating === true) {
            display.textContent += "ANS";
            // What this for???
            // ansDisplay.textContent = ans;
        }
        else {
            ansDisplay.textContent = "";
            display.textContent += "ANS";
        }
    }
})});