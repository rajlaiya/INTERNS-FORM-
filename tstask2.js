"use strict";
var TableManager = /** @class */ (function () {
    function TableManager(row) {
        this.row = row;
    }
    TableManager.prototype.getFormData = function () {
        var fullname = document.getElementById('fname').value;
        var emailid = document.getElementById('eid').value;
        var Status = document.getElementById('Stat').value;
        var Duration = document.getElementById('Duration').value;
        return { fullname: fullname, emailid: emailid, Status: Status, Duration: Duration };
    };
    TableManager.prototype.addRow = function (rowData) {
        var tableBody = document.getElementById('tableBody');
        var newRow = tableBody.insertRow();
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);
        cell1.textContent = "";
        cell2.textContent = rowData.fullname;
        cell3.textContent = rowData.emailid;
        cell4.textContent = rowData.Status;
        cell5.textContent = rowData.Duration;
        cell6.innerHTML = '<button onclick="tableManager.editRow(this)">Edit</button>';
        cell7.innerHTML = '<button onclick="tableManager.deleteRow(this)">Delete</button>';
        // Validate input fields
        if (rowData.fullname === '' || rowData.emailid === '' || rowData.Status === '' || rowData.Duration === '') {
            alert("Please fill in all fields.");
            return;
        }
        // Validate fullname contains only alphabets
        if (!/^[a-zA-Z ]+$/.test(rowData.fullname)) {
            alert("Name should contain only alphabets.");
            return;
        }
        // Check if fullname has at least 2 characters
        if (rowData.fullname.length < 2) {
            alert("Please enter at least 2 characters for the name.");
            return;
        }
        // Validate email format
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(rowData.emailid)) {
            alert("Please enter a valid email address.");
            return;
        }
    };
    TableManager.prototype.deleteRow = function (row) {
        var tableBody = document.getElementById('tableBody');
        var rowElement = row.closest('tr');
        if (rowElement) {
            tableBody.removeChild(rowElement);
            // Update serial numbers after deletion
            this.updateSerialNumbers();
        }
        else {
            console.error("Row element not found.");
        }
    };
    TableManager.prototype.editRow = function (row) {
        var _a, _b, _c;
        var cells = (_b = (_a = row.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.querySelectorAll('td');
        if (cells) {
            for (var i = 1; i < cells.length - 2; i++) {
                var value = cells[i].textContent;
                cells[i].innerHTML = "<input type=\"text\" value=\"".concat(value, "\">");
            }
            var saveButton = (_c = row.parentNode) === null || _c === void 0 ? void 0 : _c.lastChild;
            saveButton.setAttribute('onclick', 'tableManager.saveRow(this)');
            saveButton.textContent = 'Save';
        }
    };
    TableManager.prototype.saveRow = function (row) {
        var _a, _b, _c, _d;
        var cells = (_b = (_a = row.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.querySelectorAll('td');
        if (cells) {
            for (var i = 1; i < cells.length - 2; i++) {
                var value = (_c = cells[i].firstElementChild) === null || _c === void 0 ? void 0 : _c.value;
                if (value !== undefined) {
                    cells[i].textContent = value;
                }
            }
            var editButton = (_d = row.parentNode) === null || _d === void 0 ? void 0 : _d.lastChild;
            editButton.setAttribute('onclick', 'tableManager.editRow(this)');
            editButton.textContent = 'Edit';
            alert("The data has been updated.");
        }
    };
    TableManager.prototype.filterTable = function () {
        var input = document.getElementById("myInput").value.toUpperCase();
        var table = document.getElementById("myTable");
        var rows = table.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
            var td = rows[i].getElementsByTagName("td")[1]; // Index 1 represents the name column
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(input) > -1) {
                    rows[i].style.display = "";
                }
                else {
                    rows[i].style.display = "none";
                }
            }
        }
    };
    TableManager.prototype.sortTable = function () {
        var table = document.getElementById("myTable");
        var rows = [];
        for (var i = 1; i < table.rows.length; i++) {
            rows.push(table.rows[i]);
        }
        rows.sort(function (a, b) {
            var _a, _b, _c, _d;
            var nameA = (_b = (_a = a.cells[1].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
            var nameB = (_d = (_c = b.cells[1].textContent) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== null && _d !== void 0 ? _d : '';
            return nameA.localeCompare(nameB);
        });
        for (var i = 0; i < rows.length; i++) {
            table.appendChild(rows[i]);
        }
    };
    TableManager.prototype.filterByStatus = function () {
        var input = prompt("Enter status (YES/NO):");
        if (input !== null) {
            var trimmedInput = input.trim().toUpperCase(); // Trim whitespace and convert to uppercase
            if (trimmedInput === 'YES' || trimmedInput === 'NO') {
                var table = document.getElementById("myTable");
                var tr = table.getElementsByTagName("tr");
                for (var i = 0; i < tr.length; i++) {
                    var td = tr[i].getElementsByTagName("td")[3]; // Index 3 represents the status column
                    if (td) {
                        var txtValue = td.textContent || td.innerText;
                        // Convert the text content to uppercase for comparison
                        if (txtValue.trim().toUpperCase() === trimmedInput) {
                            tr[i].style.display = ""; // Show matching rows
                        }
                        else {
                            tr[i].style.display = "none"; // Hide non-matching rows
                        }
                    }
                }
            }
            else {
                alert("Invalid input. Please enter 'YES' or 'NO'.");
            }
        }
    };
    TableManager.prototype.updateSerialNumbers = function () {
        var tableBody = document.getElementById('tableBody');
        var rows = tableBody.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
            var cell = rows[i].getElementsByTagName('td')[0];
            if (cell) {
                cell.textContent = (i + 1).toString();
            }
        }
    };
    TableManager.prototype.clearStatusFilter = function () {
        // Show all rows
        var table = document.getElementById("myTable");
        var rows = table.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
            rows[i].style.display = "";
        }
        // Clear the input field (if any)
        var input = document.getElementById("myInput");
        if (input) {
            input.value = "";
        }
    };
    return TableManager;
}());
document.getElementById('clearStatusFilter').addEventListener('click', function () {
    tableManager.clearStatusFilter();
});
var row = document.getElementById('initialRow'); // Get the row element from your HTML
var tableManager = new TableManager(row);
// Call methods on the instance as needed
tableManager.deleteRow(row);
tableManager.editRow(row);
tableManager.saveRow(row);
tableManager.filterTable();
tableManager.sortTable();
tableManager.filterByStatus();
