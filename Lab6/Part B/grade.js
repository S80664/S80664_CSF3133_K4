// 2: Part 1 - List of Identified and Corrected Errors
// Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="checkMark()". Fixed to onsubmit="return checkMark()" so the result stays on the page.
// Error 2 (grade.html, Line 17): Typo in function call 'showtable()'. Fixed to 'showTable()'.
// Error 3 (grade.html, Line 19): Wrong script filename 'grades.js'. Fixed to 'grade.js'.
// Error 4 (grade.js, Line 5): Used assignment '=' instead of comparison '===' in 'if (name = "")'. Fixed to 'if (name === "")'.
// Error 5 (grade.js, Line 9): Typo in 'isNan(mark)'. Fixed to 'isNaN(mark)'.
// Error 6 (grade.js, Line 14): Invalid logical operator '&&' in 'mark < 0 && mark > 100'. Fixed to '||' (OR).
// Error 7 (grade.js, Line 28 & 30): Typo in 'getElementByID'. Fixed to 'getElementById'.
// Error 8 (grade.js, Line 30): British spelling '.style.colour'. Fixed to '.style.color'.
// Error 9 (grade.js, Line 38): Loop started at 'i = 1', skipping grade A (index 0). Fixed to 'i = 0'.
// Error 10 (grade.js, Line 42): Typo in '.innerHtml'. Fixed to '.innerHTML'.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Check if name is empty
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // 5: Check if mark field is empty
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check if mark is not a number
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Check if mark is out of 0-100 range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and set result colour (6)
    let grade;
    let resultElement = document.getElementById("result");

    if (mark >= 80) {
        grade = "A";
        resultElement.style.color = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultElement.style.color = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultElement.style.color = "orange";
    } else {
        grade = "F";
        resultElement.style.color = "red";
    }

    // Display grade result
    resultElement.innerHTML = name + " got grade " + grade;

    // 8: Display checked date and time using Date()
    document.getElementById("checkedTime").innerHTML = "Checked on: " + Date();

    // Return false to prevent form from reloading the page
    return false;
}

// 7: Function to generate a random mark from 0 to 100
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Function to display the grade reference table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    
    // Added table header row for clarity
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    
    // Fixed loop starting index from 1 to 0
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}