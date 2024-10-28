// excelscript.js

document.addEventListener("DOMContentLoaded", () => {
    const addRowBtn = document.getElementById("addRow");
    const addColBtn = document.getElementById("addCol");
    const deleteRowBtn = document.getElementById("deleteRow");
    const deleteColBtn = document.getElementById("deleteCol");
    const boldBtn = document.getElementById("bold");
    const italicBtn = document.getElementById("italic");
    const bgColorPicker = document.getElementById("bgColorPicker");
    const fontColorPicker = document.getElementById("fontColorPicker");
    const fontSizePicker = document.getElementById("fontSizePicker");
    const table = document.getElementById("excelTable");
  
    let activeCells = [];

    // Event listeners for buttons
    addRowBtn.addEventListener("click", addRow);
    addColBtn.addEventListener("click", addColumn);
    deleteRowBtn.addEventListener("click", deleteRow);
    deleteColBtn.addEventListener("click", deleteColumn);
    boldBtn.addEventListener("click", toggleBold);
    italicBtn.addEventListener("click", toggleItalic);
    bgColorPicker.addEventListener("input", changeBackgroundColor);
    fontColorPicker.addEventListener("input", changeFontColor);
    fontSizePicker.addEventListener("change", changeFontSize);
  
    // Add a new row to the table
    function addRow() {
        const newRow = table.insertRow();
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            const newCell = newRow.insertCell();
            newCell.contentEditable = "true";
            newCell.innerHTML = '<input type="checkbox" class="cell-checkbox">';
        }
    }
  
    // Add a new column to the table
    function addColumn() {
        Array.from(table.rows).forEach(row => {
            const newCell = row.insertCell();
            newCell.contentEditable = "true";
            newCell.innerHTML = '<input type="checkbox" class="cell-checkbox">';
        });
    }
  
    // Delete the last row if more than one exists
    function deleteRow() {
        if (table.rows.length > 1) {
            table.deleteRow(-1);
        } else {
            alert("Cannot delete the last row.");
        }
    }
  
    // Delete the last column if more than one exists
    function deleteColumn() {
        if (table.rows[0].cells.length > 1) {
            Array.from(table.rows).forEach(row => row.deleteCell(-1));
        } else {
            alert("Cannot delete the last column.");
        }
    }
  
    // Toggle bold style for the selected cells
    function toggleBold() {
        activeCells.forEach(cell => {
            if (cell) {
                cell.style.fontWeight = cell.style.fontWeight === "bold" ? "normal" : "bold";
            }
        });
    }
  
    // Toggle italic style for the selected cells
    function toggleItalic() {
        activeCells.forEach(cell => {
            if (cell) {
                cell.style.fontStyle = cell.style.fontStyle === "italic" ? "normal" : "italic";
            }
        });
    }
  
    // Change background color for the selected cells
    function changeBackgroundColor(event) {
        activeCells.forEach(cell => {
            if (cell) {
                cell.style.backgroundColor = event.target.value;
            }
        });
    }

    // Change font color for the selected cells
    function changeFontColor(event) {
        activeCells.forEach(cell => {
            if (cell) {
                cell.style.color = event.target.value;
            }
        });
    }

    // Change font size for the selected cells
    function changeFontSize(event) {
        activeCells.forEach(cell => {
            if (cell) {
                cell.style.fontSize = event.target.value;
            }
        });
    }

    // Add event listener for checkboxes to update activeCells array
    table.addEventListener("change", (e) => {
        if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
            const cell = e.target.closest('td');
            if (e.target.checked) {
                if (!activeCells.includes(cell)) {
                    activeCells.push(cell);
                    cell.classList.add('selected');
                }
            } else {
                activeCells = activeCells.filter(c => c !== cell);
                cell.classList.remove('selected');
            }
        }
    });
});
