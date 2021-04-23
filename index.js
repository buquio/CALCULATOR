"use strict";

var input = document.getElementById('input'), 
  number = document.querySelectorAll('.numbers div'), 
  operator = document.querySelectorAll('.operators div'), 
  result = document.getElementById('result'), 
  clear = document.getElementById('clear'), 
  resultDisplayed = false; 
  // 1) add listener for all keypresses and
  //  (2) determine the key that is pressed.

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    // e.target/e.target.value/e.target.innerhtml

    // storing current-input-string/lastchar from input into var
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if no number is initially diplayed, then start adding number
      // If display is false or shows zero 
      // or if display shows a number the target number will be appended to +=the displayed number.
    if (resultDisplayed === false) {  
      input.innerHTML += e.target.innerHTML;// store the innerhtml of number into input one by one
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      //??
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// adding click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // storing current-input-string/lastchar from input into var
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      
      console.log("enter a number first");
    } else {
  
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// add eventlistener to  click of equal-to-button
result.addEventListener("click", function() {
  var inputString = input.innerHTML;
  var numbers = inputString.split(/\+|\-|\×|\÷/g); //coverted string to number
//why is above stored in numbers not operator?? also next line??
  var operators = inputString.replace(/[0-9]|\./g, "").split("");//coverted to number

  console.log(inputString); 
  console.log(numbers); //array[0]
  console.log(operators); //array[1]
  console.log("----------------------------");

  var divide = operators.indexOf("÷");
  while (divide != -1) { //is not equal to
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; 

  resultDisplayed = true; 
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})

