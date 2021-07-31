/**
 * @file script.js
 * @author Mit Bailey (mitbailey99@gmail.com)
 * @brief JavaScript for website.
 * 
 * @version 0.1
 * @date 2021.07.14
 * 
 * @copyright Copyright (c) 2021
 */

// Toggle navbar visibility.
function collapseNavbar() {
    var sideNavbar = document.getElementById("side_navbar");
    if (sideNavbar.style.visibility === "visible") {
        sideNavbar.style.visibility = "hidden";
    } else {
        sideNavbar.style.visibility = "visible";
    }
}

function submitFormValues() {
    /**
     * values[0] - x-axis start
     * values[1] - x-axis end
     * values[2] - y-axis start
     * values[3] - y-axis end
     */

    // Store all output text objects into an array.
    var text_outputs = [document.getElementById("val1text"), document.getElementById("val2text"), document.getElementById("val3text"), document.getElementById("val4text")]

    // Store the user-input values into an array.
    var values = [document.getElementById("val1").value, document.getElementById("val2").value, document.getElementById("val3").value, document.getElementById("val4").value];

    // In case of an error we cannot recover from.
    var fatal_error = false;

    // Print the input values.
    console.log(values);

    // Ensure all values are valid.
    for (var i = 0; i < values.length; i++) {

        // Null value.
        if (values[i] == "") {
            console.log("Null value!");
            text_outputs[i].style.color = "red";
            text_outputs[i].style.fontWeight = "bold";
            text_outputs[i].textContent = "Invalid value!";
            fatal_error = true;
        }
        else { // Check bounds, clamp if necessary.
            if (values[i] > 64) {
                text_outputs[i].style.color = "orange";
                text_outputs[i].style.fontWeight = "bold";
                console.log("Value too large, clamping.");
                values[i] = 64;
                text_outputs[i].textContent = values[i] + " (clamped)";
            }
            else if (values[i] < -64) {
                text_outputs[i].style.color = "orange";
                text_outputs[i].style.fontWeight = "bold";
                console.log("Value too small, clamping.");
                values[i] = -64;
                text_outputs[i].textContent = values[i] + " (clamped)";
            }
            else {
                text_outputs[i].style.color = "black";
                text_outputs[i].textContent = values[i];
            }
        }
    }

    // This can be used if one desires least-to-greatest axes only.
    // if (values[0] > values[1]) {
    //     text_outputs[0].textContent = "Start value must be less than end value!";
    //     text_outputs[1].textContent = "Start value must be less than end value!";
    //     fatal_error = true;
    // }

    // if (values[2] > values[3]) {
    //     text_outputs[2].textContent = "Start value must be less than end value!";
    //     text_outputs[3].textContent = "Start value must be less than end value!";
    //     fatal_error = true;
    // }

    // If we had a fatal error, stop here.
    if (fatal_error) {
        return;
    }

    // Convert the values to number type.
    for (var i = 0; i < 4; i++) {

        // Subtract one since the zeroth element is lost in the corner.
        values[i] = Number(values[i]) - 1;
    }

    var mult_table = document.getElementById("mult-table");
    var y_range = 0;
    var x_range = 0;

    // Clear the table, ensuring we don't pile up cells ad infinitum.
    clearTable();

    // Calculate the ranges for...
    // Y-Axis
    if (values[2] < values[3]) { // If y-axis is least to greatest...
        y_range = values[3] - values[2];
    }
    else if (values[2] > values[3]) { // ...greatest to least...
        y_range = values[2] - values[3];
    }
    // ...or equivalent (0 by default).

    // X-Axis
    if (values[0] < values[1]) { // If x-axis is least to greatest...
        x_range = values[1] - values[0];
    }
    else if (values[0] > values[1]) { // ...greatest to least...
        x_range = values[0] - values[1];
    }
    // ...or equivalent (0 by default).

    // Print the ranges.
    console.log("y_range: ", y_range);
    console.log("x_range: ", x_range);

    // To make the range inclusive (ie from "0 to 10" is 11 numbers, which is (10 - 0) + 1).
    x_range += 2;
    y_range += 2;

    // Print the adjusted ranges.
    console.log("y_range (ADJ): ", y_range);
    console.log("x_range (ADJ): ", x_range);

    // Here we fill in all of the cells of the table by using a nested for-loop.
    // First we create and then fill in the value for each cell.
    for (var i = 0; i < y_range; i++) {
        // Add a row for each value of y_range.
        mult_table.appendChild(document.createElement("tr"));

        // Add the cells for each row.
        for (var ii = 0; ii < x_range; ii++) {

            // Check if a cell should be a header or is the top left corner.
            if (i == 0 && ii == 0) { // The top left corner.
                mult_table.children[i].appendChild(document.createElement("td"));
            }
            else if (i == 0) { // Header row.
                mult_table.children[i].appendChild(document.createElement("th"));

                // Also check if the values are least to greatest or greatest to least.
                if (values[0] > values[1]) {
                    mult_table.children[i].children[ii].textContent = values[0] - ii + 2;
                }
                else {
                    mult_table.children[i].children[ii].textContent = ii + values[0];
                }
            }
            else if (ii == 0) { // Header column.
                mult_table.children[i].appendChild(document.createElement("th"));

                if (values[2] > values[3]) {
                    mult_table.children[i].children[ii].textContent = values[2] - i + 2;
                }
                else {
                    mult_table.children[i].children[ii].textContent = i + values[2];
                }
            }
            else { // In the table body.
                mult_table.children[i].appendChild(document.createElement("td"));

                if (values[0] > values[1]) {
                    mult_table.children[i].children[ii].textContent = (values[0] - ii + 2) * (values[2] - i + 2);
                }
                else {
                    mult_table.children[i].children[ii].textContent = (ii + (values[0])) * (i + (values[2]));
                }
            }
        }
    }
}

// Clears the entire table so that nothing appears.
function clearTable() {
    var mult_table = document.getElementById("mult-table");

    // While the table has any children, remove the first child.
    while (mult_table.children.length) {
        mult_table.children[0].remove();
    }
}