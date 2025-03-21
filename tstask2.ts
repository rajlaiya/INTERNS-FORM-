
// Define types for row data
export {}


// Define types for row data
interface RowData {
    fullname: string;
    emailid: string;
    Status: string;
    Duration: string;
}

class TableManager {//i use row data in this class
    row: HTMLButtonElement; // Declare row as a class member

    constructor(row: HTMLButtonElement) {
        this.row = row;
    }
    
    getFormData(): RowData {
        const fullname = (document.getElementById('fname') as HTMLInputElement).value;
        const emailid = (document.getElementById('eid') as HTMLInputElement).value;
        const Status = (document.getElementById('Stat') as HTMLSelectElement).value;
        const Duration = (document.getElementById('Duration') as HTMLInputElement).value;
        return { fullname, emailid, Status, Duration };
    }

    addRow(rowData: RowData) {
        const tableBody = document.getElementById('tableBody') as HTMLTableSectionElement;
        const newRow = tableBody.insertRow();
        
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);


        cell1.textContent = ""
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(rowData.emailid)) {
        alert("Please enter a valid email address.");
        return;
    }

    }

    deleteRow(row: HTMLButtonElement) {
    const tableBody = document.getElementById('tableBody') as HTMLTableSectionElement;
    const rowElement = row.closest('tr');
    if (rowElement) {
        tableBody.removeChild(rowElement);
        // Update serial numbers after deletion
        this.updateSerialNumbers();
    } else {
        console.error("Row element not found.");
    }
}

    
    editRow(row: HTMLButtonElement) {
        const cells = (row.parentNode?.parentNode as HTMLTableRowElement)?.querySelectorAll('td');
        if (cells) {
            for (let i = 1; i < cells.length - 2; i++) {
                const value = cells[i].textContent;
                cells[i].innerHTML = `<input type="text" value="${value}">`;
            }
            const saveButton = row.parentNode?.lastChild as HTMLButtonElement;
            saveButton.setAttribute('onclick', 'tableManager.saveRow(this)');
            saveButton.textContent = 'Save';
        }
    }

    saveRow(row: HTMLButtonElement) {
        const cells = (row.parentNode?.parentNode as HTMLTableRowElement)?.querySelectorAll('td');
        if (cells) {
            for (let i = 1; i < cells.length - 2; i++) {
                const value = (cells[i].firstElementChild as HTMLInputElement)?.value;
                if (value !== undefined) {
                    cells[i].textContent = value;
                }
            }
            const editButton = row.parentNode?.lastChild as HTMLButtonElement;
            editButton.setAttribute('onclick', 'tableManager.editRow(this)');
            editButton.textContent = 'Edit';
            alert("The data has been updated.");
        }
    }

    filterTable() {
        const input = (document.getElementById("myInput") as HTMLInputElement).value.toUpperCase();
        const table = document.getElementById("myTable") as HTMLTableElement;
        const rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            const td = rows[i].getElementsByTagName("td")[1]; // Index 1 represents the name column
            if (td) {
                const txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(input) > -1) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
    }

    sortTable() {
        const table = document.getElementById("myTable") as HTMLTableElement;
        const rows: HTMLTableRowElement[] = [];
        for (let i = 1; i < table.rows.length; i++) {
            rows.push(table.rows[i]);
        }

        rows.sort((a, b) => {
            const nameA = a.cells[1].textContent?.toLowerCase() ?? '';
            const nameB = b.cells[1].textContent?.toLowerCase() ?? '';
            return nameA.localeCompare(nameB);
        });
        
        for (let i = 0; i < rows.length; i++) {
            table.appendChild(rows[i]);
        }
    }

    filterByStatus() {
        const input = prompt("Enter status (YES/NO):");
        if (input !== null) {
            const trimmedInput = input.trim().toUpperCase(); // Trim whitespace and convert to uppercase
            if (trimmedInput === 'YES' || trimmedInput === 'NO') {
                const table = document.getElementById("myTable") as HTMLTableElement;
                const tr = table.getElementsByTagName("tr");
                for (let i = 0; i < tr.length; i++) {
                    const td = tr[i].getElementsByTagName("td")[3]; // Index 3 represents the status column
                    if (td) {
                        const txtValue = td.textContent || td.innerText;
                        // Convert the text content to uppercase for comparison
                        if (txtValue.trim().toUpperCase() === trimmedInput) {
                            tr[i].style.display = ""; // Show matching rows
                        } else {
                            tr[i].style.display = "none"; // Hide non-matching rows
                        }
                    }
                }
            } else {
                alert("Invalid input. Please enter 'YES' or 'NO'.");
            }
        }
    } 

    updateSerialNumbers() {
        const tableBody = document.getElementById('tableBody') as HTMLTableSectionElement;
        const rows = tableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const cell = rows[i].getElementsByTagName('td')[0];
            if (cell) {
                cell.textContent = (i + 1).toString();
            }
        }
    }

    clearStatusFilter() {
        // Show all rows
        const table = document.getElementById("myTable") as HTMLTableElement;
        const rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = "";
        }

        // Clear the input field (if any)
        const input = document.getElementById("myInput") as HTMLInputElement;
        if (input) {
            input.value = "";
        }
    }

}

document.getElementById('clearStatusFilter')!.addEventListener('click', () => {
    tableManager.clearStatusFilter();
});

const row = document.getElementById('initialRow') as HTMLButtonElement; // Get the row element from your HTML
const tableManager = new TableManager(row);

// Call methods on the instance as needed
tableManager.deleteRow(row);
tableManager.editRow(row);
tableManager.saveRow(row);
tableManager.filterTable();
tableManager.sortTable();
tableManager.filterByStatus();
