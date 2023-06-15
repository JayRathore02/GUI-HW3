/*
Sources: 
https://www.w3schools.com/js/
Traversy Media on YT
*/


/* 
constants that get all id's and classes that I need like the 
4 text fields, error message area, table area and the form
*/
const myForm = document.querySelector('#myForm');
const errMsg = document.querySelector('.errMsg');
const xStart = document.querySelector('#xStart');
const xEnd = document.querySelector('#xEnd');
const yStart = document.querySelector('#yStart');
const yEnd = document.querySelector('#yEnd');
const table = document.querySelector('#multTable');

// adds a listener for the form's button
myForm.addEventListener('submit', onSubmit);

// function that will run when the button is clicked
// It will either display an error on the HTML or generate the table
function onSubmit(e) {
    // These 4 let statements get the integer value for the input areas of the form
    let xStartVal = parseInt(xStart.value);
    let xEndVal = parseInt(xEnd.value);
    let yStartVal = parseInt(yStart.value);
    let yEndVal = parseInt(yEnd.value);

    // this variable is a boolean that sees if any value in the form is out of the -50 to 50 range
    let isOutOfRange = xStartVal < -50 || xStartVal > 50 || xEndVal < -50 || xEndVal > 50 || yStartVal < -50 || yStartVal > 50 || yEndVal < -50 || yEndVal > 50;
    e.preventDefault();

    // this variable is a boolean used to determine if the input is the correct type
    let isCorrectType = true;
    if (isNaN(xStartVal) || isNaN(xEndVal) || isNaN(yStartVal) || isNaN(yEndVal) || !Number.isInteger(xStartVal) || !Number.isInteger(xEndVal) || !Number.isInteger(yStartVal) || !Number.isInteger(yEndVal)) {
        isCorrectType = false;
    }
      
    // clears the table elements when button is clicked, removes the "children" one at a time
    while (table.firstChild) {
        table.firstChild.remove();
    }

    // checks if values are actually input correctly
    if (xStartVal >= xEndVal || yStartVal >= yEndVal || isOutOfRange === true || isCorrectType === false) {
        errMsg.innerHTML = 'Please follow the rules';  // sets the error message area to this string
        errMsg.style.display = 'block'; // Shows the error message
    
        setTimeout(() => {
            errMsg.innerHTML = ''; // Clears the error message 
            errMsg.style.display = 'none'; // Hides the error message
        }, 3000);
    } else {
        // gets columns and rows, it adds 2 to be inclusive of the start and end values
        let cols = xEndVal - xStartVal + 2;
        let rows = yEndVal - yStartVal + 2;

        // creates arrays for both x and y values where both are first initally filled with only the start val
        const xArr = [xStartVal];
        const yArr = [yStartVal];

        // populates the arrays where i is the start val and it keeps adding one until the end val
        for (let i = xStartVal + 1; i <= xEndVal; i++) {
            xArr.push(i);
        }
        for (let i = yStartVal + 1; i <= yEndVal; i++) {
            yArr.push(i);
        }

        //console.log(rows + ' ' + cols);
        //console.log(xArr);
        //console.log(yArr);

        // double for loop to populate table area
        for (let i = 0; i < rows; i++) {
            // adds a tr element to the table html
            let tr = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                // adds td element
                let td = document.createElement('td');
                // adds a table(t) Element variable, I initally set it to j just to give it a value
                let tElement = document.createTextNode(j);

                if (i === 0 && j === 0) {
                    // the top left of the table will be a blank area so it will have blank text as the variable
                    tElement = document.createTextNode('');
                } else if (j === 0) {
                    // the first column will be populated by the yArr
                    tElement = document.createTextNode(yArr[i - 1]);
                } else if (i === 0) {
                    // the first row will be populated by the xArr
                    tElement = document.createTextNode(xArr[j - 1]); 
                } else {
                    // the rest of the table will be populated by the product
                    tElement = document.createTextNode(xArr[j - 1] * yArr[i - 1]); 
                }

                // the rest appends elements to the rest of the list so it's in proper order
                td.appendChild(tElement);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }
}
