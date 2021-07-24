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

    var text_outputs = [document.getElementById("val1text"), document.getElementById("val2text"), document.getElementById("val3text"), document.getElementById("val4text")]

    var values = [document.getElementById("val1").value, document.getElementById("val2").value, document.getElementById("val3").value, document.getElementById("val4").value];

    var fatal_error = false;

    console.log(values);

    // Ensure all values are valid.
    for (var i = 0; i < 4; i++)
    {
        if (values[i] == "")
        {
            console.log("Null value!");
            text_outputs[i].textContent = "Invalid value!";
            fatal_error = true;
        }
        else
        {
            if (values[i] > 64)
            {
                console.log("Value too large, clamping.");
                values[i] = 64;
            }
            else if (values[i] < -64)
            {
                console.log("Value too small, clamping.");
                values[i] = -64;
            }

            text_outputs[i].textContent = values[i];
        }
    }

    if (fatal_error)
    {
        return;
    }

    // Convert the values to number type.
    for (var i = 0; i < 4; i++)
    {
        // Subtract one since the zeroth element is lost in the corner.
        values[i] = Number(values[i]) - 1;
    }

    var mult_table = document.getElementById("mult-table");
    var y_range = 0;
    var x_range = 0;

    clearTable();

    // Y-Axis
    if (values[2] < values[3])
    { // If y-axis is least to greatest...
        y_range = values[3] - values[2];
    }
    else if (values[2] > values[3])
    { // ...greatest to least...
        y_range = values[2] - values[3];
    }
    // ...or equivalent (1 by default).

    // X-Axis
    if (values[0] < values[1])
    { // If x-axis is least to greatest...
        x_range = values[1] - values[0];
    }
    else if (values[0] > values[1])
    { // ...greatest to least...
        x_range = values[0] - values[1];
    }
    // ...or equivalent (1 by default).

    console.log("y_range: ", y_range);
    console.log("x_range: ", x_range);

    // To make the range inclusive (ie from "0 to 10" is 11 numbers, which is (10 - 0) + 1).
    x_range += 2;
    y_range += 2;
   
    console.log("y_range (ADJ): ", y_range);
    console.log("x_range (ADJ): ", x_range);

    // TODO: Fix the display bug when start > end
    for (var i = 0; i < y_range; i++)
    {
        mult_table.appendChild(document.createElement("tr"));
        for (var ii = 0; ii < x_range; ii++)
        {
            if (i == 0 && ii == 0)
            { // The top left corner.
                mult_table.children[i].appendChild(document.createElement("td"));
            }
            else if (i == 0)
            { // Header row.
                mult_table.children[i].appendChild(document.createElement("th"));
                mult_table.children[i].children[ii].textContent = ii + (values[0]);

            }
            else if (ii == 0)
            { // Header column.
                mult_table.children[i].appendChild(document.createElement("th"));
                mult_table.children[i].children[ii].textContent = i + (values[2]);
            }
            else
            { // In the table body.
                mult_table.children[i].appendChild(document.createElement("td"));
                mult_table.children[i].children[ii].textContent = (ii + (values[0])) * (i + (values[2]));
            }
        }
    }
}

function clearTable() {
    var mult_table = document.getElementById("mult-table");

    while (mult_table.children.length)
    {
        mult_table.children[0].remove();
    }
}