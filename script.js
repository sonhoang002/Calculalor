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
    // {id : 'decimal', num : '.'},
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

// Keeping track of which side of the operator I am on
let position = 0;

let operating = false;
let doubling = false;
let single = true;
let decimal = [false, false];
const sign = ['+', '-', '*', '/'];

// Mouse/buttons Event
btnPress.forEach(btn => {btn.addEventListener("click", () => {
    handleInput(btn.id);
})});

// Keyboard event
document.addEventListener("keydown", (e) => {
    const keyMap = {
        "." : "decimal",
        "Backspace" : "del",
        "c" : "ac",
        "a" : "ans",
        "Enter" : "equals",
        "*": "mul",
        "/": "div",
        "+": "plus",
        "-": "minus",
        "0" : "zero",
        "1": "one",
        "2": "two",
        "3": "three",
        "4": "four",
        "5": "five",
        "6": "six",
        "7": "seven",
        "8": "eight",
        "9": "nine",
    };

    const inputId = keyMap[e.key];
    if (inputId) {
        handleInput(inputId);
    }
});


// THE function
function handleInput(inputId) {
    console.log(doubling);
    if (digitsAndStuff.find(digit => digit.id === inputId)) {

        // If there is no previous ANS, function normally
        if (ansDisplay.textContent === "") {

            // Not already in an operation
            if ((inputId === "mul" || inputId === "div" ||inputId === "plus" ||inputId === "minus") && operating === false) {
                operating = true;
                position = 1;
                single = false;
                display.textContent += `${digitsAndStuff.find(digit => digit.id === inputId).num}`;
            } 
            
            // Working on this
            else if ((inputId === "mul" || inputId === "div" ||inputId === "plus" ||inputId === "minus") && operating === true) {
                const index = [...display.textContent].findIndex(char => sign.includes(char));
                let firstNum = display.textContent.substring(0, index);
                let secondNum = display.textContent.substring(index + 1, display.textContent.length);
                let operater = display.textContent.charAt(index);

                if (operating === true && (firstNum === "" || secondNum === "")) {
                    operating = false;
                    doubling = true;
                    display.textContent += `${digitsAndStuff.find(digit => digit.id === inputId).num}`;
                } else {
                    console.log('no');
                    // Should not jump into this if there is an operator already
                    ansDisplay.textContent = operate((firstNum === "ANS" ? ans : firstNum), operater, (secondNum === "ANS" ? ans : secondNum));
                    ans = parseFloat(ansDisplay.textContent);
                    if (!Number.isNaN(ans)) {
                        display.textContent = `ANS${digitsAndStuff.find(digit => digit.id === inputId).num}`;
                    } else {
                        display.textContent = "";
                        ansDisplay.textContent = (Number.isNaN(ans)) ? "Div by zero error!" : ans;
                        ans = NaN;
                        operating = false;
                    }
                }

                // Enable the decimal for the particular operation
                decimal[position] = false;
                single = false;

            } else {
                display.textContent += `${digitsAndStuff.find(digit => digit.id === inputId).num}`;
                ansDisplay.textContent = "";
            }
        }

        // If there are previous ans, save it and do calculation accordingly
        else {
            // If not already in an operation
            if ((inputId === "mul" || inputId === "div" || inputId === "plus" || inputId === "minus") && operating === false) {
                single = false;
                operating = true;
                display.textContent = `ANS${digitsAndStuff.find(digit => digit.id === inputId).num}`;
                ansDisplay.textContent = "";
                position = 1;
            } 
            else if ((inputId !== "mul" && inputId !== "div" && inputId !== "plus" && inputId !== "minus") && operating === true){
                console.log("not here");
                display.textContent += `${digitsAndStuff.find(digit => digit.id === inputId).num}`;
            }
            else if ((inputId === "mul" || inputId === "div" || inputId === "plus" || inputId === "minus") && operating === true) {
                const index = [...display.textContent].findIndex(char => sign.includes(char));
                let firstNum = display.textContent.substring(0, index);
                let secondNum = display.textContent.substring(index + 1, display.textContent.length);
                let operater = display.textContent.charAt(index);

                if (firstNum === "" || secondNum === "") {
                    ansDisplay.textContent === "Can't do that!";
                } else {
                    ansDisplay.textContent = operate((firstNum === "ANS" ? ans : firstNum), operater, (secondNum === "ANS" ? ans : secondNum));
                    ans = parseFloat(ansDisplay.textContent);

                    display.textContent = `ANS${digitsAndStuff.find(digit => digit.id === inputId).num}`;
                    ansDisplay.textContent = ans;
                }
                decimal[position] = false;
                single = false;
            }
            else {
                display.textContent = `${digitsAndStuff.find(digit => digit.id === inputId).num}`;
                ansDisplay.textContent = "";
            }
        }
    }

    // The rest of the buttons
    else if (inputId === "ac") {
        single = true;
        operating = false;
        display.textContent = "";
        ansDisplay.textContent = "";
        ans = 0;
        decimal[0] = false;
        decimal[1] = false;
        position = 0;
    } else if (inputId === "del") {
        if (ansDisplay.textContent === "" || (ansDisplay.textContent !== "" && operating === true)) {
            if (display.textContent.charAt(display.textContent.length - 1) === "S") {
                display.textContent = `${display.textContent.substring(0, display.textContent.length - 3)}`;
            } else if (display.textContent.charAt(display.textContent.length - 1) === ".") {
                display.textContent = `${display.textContent.substring(0, display.textContent.length - 1)}`;
                decimal[position] = false;
            } else if (sign.includes(display.textContent.charAt(display.textContent.length - 1))) {
                console.log("testing this");
                single = true;
                operating = false;
                display.textContent = `${display.textContent.substring(0, display.textContent.length - 1)}`;
                decimal[position] = false;
                position = 0;
            } else {
                display.textContent = `${display.textContent.substring(0, display.textContent.length - 1)}`;
                operating = false;
            }
            ansDisplay.textContent = "";
        } 
        // ??? TESTING
        // else if (ansDisplay.textContent !== "" && operating === true) {
        //     if (display.textContent.charAt(display.textContent.length - 1) === "S") {
        //         display.textContent = `${display.textContent.substring(0, display.textContent.length - 3)}`;
        //     } else {
        //         display.textContent = `${display.textContent.substring(0, display.textContent.length - 1)}`;
        //     }
        //     ansDisplay.textContent = "";
        //     operating = false;
        // }
    } else if (inputId === "equals") {
        if (single === true) {
            ans = Math.round(parseFloat(display.textContent === 'ANS' ? ans : display.textContent) * 10) / 10;
            ansDisplay.textContent = ans;
            console.log(operating);
        } else {
            console.log("no");
            if (doubling !== true) {
                const index = [...display.textContent].findIndex(char => sign.includes(char));
                let firstNum = display.textContent.substring(0, index);
                let secondNum = display.textContent.substring(index + 1, display.textContent.length);
                let operater = display.textContent.charAt(index);
                ansDisplay.textContent = operate((firstNum === "ANS" ? ans : firstNum), operater, (secondNum=== "ANS" ? ans : secondNum));
                ans = Math.round(parseFloat(ansDisplay.textContent) * 10) / 10;
                operating = false;
            } else if (doubling == true) {
                ansDisplay.textContent = "Too Advanced!";
                ans = NaN;
                doubling = false;
            }
            decimal[position] = false;
            position = 0;
        }
    } else if (inputId === "ans") {
        if (ansDisplay.textContent !== "" && operating === false) {
            display.textContent = "ANS";
            ansDisplay.textContent = "";
        } else if (ansDisplay.text !== "" && operating === true) {
            display.textContent += "ANS";
            // What this for???
            // ansDisplay.textContent = ans;
        } else  {
            ansDisplay.textContent = "";
            display.textContent += "ANS";
        }
    } else if (inputId === "decimal") {
        if (decimal[position] !== true) {
            console.log(decimal[position]);
            display.textContent += `.`;
            decimal[position] = true;
        }
    }
}