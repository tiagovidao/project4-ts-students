// Import data from a separate file
import data from './data.js';

// Parse the imported data into a JSON object
const students = JSON.parse(data);

// Define an interface for a Student object
interface Student {
    id: string,
    first_name: string,
    last_name: string,
    date_admission: string,
    birth_year: string,
    focus_area?: string | string[], // optional, can be a single string or an array of strings
    date_registration_suspended?: string // optional
}

// Function to add a row to an HTML table for a given student
function addRow(table: HTMLTableElement, student: Student) {
    // Create a new table row
    let tr = table.querySelector("tbody")!.insertRow();
    
    // Create a cell for the student's name
    const name = tr.insertCell();
    name.appendChild(document.createTextNode(`${student.first_name} ${student.last_name}`));
    
    // Create a cell for the student's age
    const age = tr.insertCell();
    age.appendChild(document.createTextNode((new Date().getFullYear() - parseInt(student.birth_year)).toString()));
    
    // Create a cell for the student's focus area(s)
    const majors = tr.insertCell();
    if (student.focus_area) {
        // If focus area is a single string, display it as is
        if (typeof student.focus_area == "string") {
            majors.appendChild(document.createTextNode(student.focus_area));
        } else {
            // If focus area is an array of strings, concatenate them with commas
            let areas = "";   
            student.focus_area.forEach(function(area) {
                areas += area + ", ";
            });
            majors.appendChild(document.createTextNode(areas.slice(0, -2)));
        }
    } else {
        // If no focus area is provided, display a placeholder
        majors.appendChild(document.createTextNode("---"));
    }
    
    // Create a cell for the student's status
    const status = tr.insertCell();
    if (student.date_registration_suspended) {
        // If the student's registration is suspended, display "Inactive"
        status.appendChild(document.createTextNode("Inactive"));
    } else {
        // Otherwise, display "Add"
        status.appendChild(document.createTextNode("Add"));
    }
}

// Function to select the HTML table element
function selectTable() {
    return <HTMLTableElement>document.querySelector("#students-table");
}


 //Refreshes the content of a table by removing existing rows and adding new ones based on the provided student data.
function refreshTable(table: HTMLTableElement, students: Student[]) {
    // Clear the existing table body content to prepare for new data
    table.querySelector("tbody")!.innerHTML = "";
    
    // Iterate over each student in the provided array and add a new table row for each one
    students.forEach(student => {
        addRow(table, student);
    });
}

// When the window loads, refresh the table with the students data
window.onload = function() {
    refreshTable(selectTable(), students);
}

// This line is unnecessary and can be removed, as it's already called in the window.onload event
addRow(selectTable(), students);