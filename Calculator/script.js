let display = document.getElementById('display');
let buttons = document.getElementsByClassName('button');

let operand = 0;
let operator = null;

for(let btn of buttons){
    btn.addEventListener('click', ()=>{
        let value = btn.getAttribute('data-value');
        calculator(value);
    });
}

function calculator(value){
    if(value == '+' || value == '-' || value == '*' || value == '/'){
        // Fetching the operand1 and operator
        operator = value;
        display.innerText += operator;
    }else if(value == '%'){
        // Calculate the percentage
        operand = parseFloat(display.textContent);
        display.innerText = "";
        operand = operand/100;
        display.innerText = operand;
    }else if(value == '+/-'){
        // Converts positive number to negative number and vice-versa
        operand = parseFloat(display.textContent);
        operand = (-1)*operand;
        display.innerText = operand;
    }else if(value == '='){
        // Calculates the expression value by fetching operand2
        let expression = display.textContent;
        // operand2 = parseFloat(display.textContent);
        display.innerText = "";
        operand = evaluateExpression(expression);
        if(operand != 'Error'){
            operand = Math.round(operand*100)/100;
        }
        display.innerText = operand;
    }else if(value == 'AC'){
        // Clears the display of the Calculator
        display.innerText = "";
    }else{
        // Appends numeric values to the display
        display.innerText += value;
    }
}

function evaluateExpression(expression){
    // let expression = operand1 + " " + operator + " " + operand2;
    let value = eval(expression);
    // Check condition for Divide by zero error
    if(value == 'Infinity' || isNaN(value)){
        return 'Error';
    }
    return value;
}