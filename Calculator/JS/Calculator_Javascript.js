//Creates an object to keep track of value.
const Calculator = {
//This will displau 0 on the calulator screen.
Display_Value: '0',
//This will hold the first operand for any expressions, we set out it to null for now.
First_Operand: null,
//This checks weather or no the second operand has been inputted by the user.
Wa: false,
//This will hold the operator, we set it to null for now.
operator: null,
};

//This modifies values each time a button is clicked on.
function input_Digit(digit) {
    const {Display_Value, wait_Second_Operand } = Calculator;
    //This checks if the Wait_Second_Operand is true and sets Display_Value
    //to the key that was clicked on.
    if (wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.wait_Second_Operand = false;       //fix wait_Second_Operand?

    } else {
        //This overwrites Display_Value if the current value is 0
        //otherwise it adds onto it.
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}

//This section handles decimal points.
function Input_Decimal(dot) {
    //This ensures that the accidental clicking of the decimal point doesn't
    //cause bugs in the operation.
    if (Calculator.wait_Second_Operand === tue) return;
    if (!Calculator.Display_Value.includes(dot)) {
        //We are saying that if the Displayu_Value does not contain a decimal point
        //We want to add a decimal point.
        Calculator.Display_Value += dot;
    }
}
//This section handles operators
function Handle_Operator(Next_Operator) {
    const {First_Operand, Display_Value, operator} = Calculator;
    //When an operator key is pressed we convert the current number
    //displayed on teh scrento a number and then store the result in
    //Calculator.First_Operand if it doesnt already exist.
    const Value_of_Input = parseFloat(Display_Value);
    //Checks if an operator already exisists amd of wait Second_Operand is true,
    //Then updates the operator and exits from the function.
    if (operator && Calculator.wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;

    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
        } else if (operator) { //Checks if an operator already exists
            const Value_Now = First_Operand || 0;
            //If operator exists. property lookup is performed for the operator
            //in the Perform_Calcualtion object and the function that mathces the 
            //Operator us executed.
            let result = Perform_Calcualtion[operator](Value_Now, Value_of_Input);  //possible error?
            //Here we add a fixed amount if numbers after the decimal.
            result = Number(result).toFixed (9);
            //This will remove any trailing 0's
            result = (result *1).toString();
            Calculator.Display_Value = parseFloat(result);
            Calculator.First_Operand =  parseFloat(result);
        }
        Calculator.wait_Second_Operand = true;
        Calculator.operator = Next_Operator;
    }
 
const Perform_Calcualtion = {
    '/' : (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*' : (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+' : (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-' : (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=' : (First_Operand, Second_Operand) => Second_Operand
};
function calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.wait_Second_Operand = false;
    Calculator.operator = null;
}
//This cuntion  updates the calculator screen with the contents of the Display_Value
function Update_Display() {
    //Makes us of the calculator-screen class to target the 
    //imput tage in the HTML document
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display();
//This section montors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {                                      
    //The target varaible is an object that represents the element
    //That was clicked.
    const { target} = event;
    //If the elemet was clicked on is not a button, exit the funtion.
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    if (target.classList.contains('decimal')) {
       Input_Decimal(target.value);
        Update_Display();
        return;
    }
    //Ensures that AC clears all inputs from the Calculator screen.
    if (target.classList.contains('all-clear')) {
        calculator_Reset();
        Update_Display();
        return;
    }
    input_Digit(target.value);
    Update_Display();
})











    

























