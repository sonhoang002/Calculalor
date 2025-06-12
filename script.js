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
btnPress.forEach(btn => {btn.addEventListener("click", () => {
    if (digitsAndStuff.find(digit => digit.id === btn.id)) {
        if (ansDisplay.textContent === "") {
            display.textContent += `${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
        } else {
            if (btn.id === "mul" || btn.id === "div" ||btn.id === "plus" ||btn.id === "minus") {
                display.textContent = `ANS${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
                ansDisplay.textContent = "";
            } else {
                display.textContent = `${digitsAndStuff.find(digit => digit.id === btn.id).num}`;
                ansDisplay.textContent = "";
            }
        }
    } else if (btn.id === "ac") {
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
    } else if (btn.id === "equals") {
        const sign = ['+', '-', '*', '/'];
        const index = [...display.textContent].findIndex(char => sign.includes(char));
        let firstNum = display.textContent.substring(0, index);
        let secondNum = display.textContent.substring(index + 1, display.textContent.length);
        let operater = display.textContent.charAt(index);
        ansDisplay.textContent = operate((firstNum === "ANS" ? ans : firstNum), operater, (secondNum=== "ANS" ? ans : secondNum));
        console.log(firstNum);
        console.log(secondNum);
        ans = parseFloat(ansDisplay.textContent);
    } else if (btn.id === "ans") {
        if (ansDisplay.textContent !== "") {
            display.textContent = "ANS";
            ansDisplay.textContent = "";
        } else {
            ansDisplay.textContent = "";
        display.textContent += "ANS";
        }
    }
})});