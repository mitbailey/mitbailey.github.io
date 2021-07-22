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