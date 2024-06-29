const correctAnswers = [
    ['I', 'C', 'A', 'N', 'T'],
    ['K', 'A', 'B', 'O', 'B'],
    ['N', 'A', 'N', 'N', 'A'],
    ['E', 'M', 'E', 'E', 'R'],
    ['W', 'A', 'R', 'T', 'S']
];

let selectedDirection = 'row';
let selectedIndex = 0;
let startTime = null;

function startTimer() {
    if (!startTime) {
        startTime = new Date();
    }
}

function stopTimer() {
    if (startTime) {
        const endTime = new Date();
        const timeDiff = endTime - startTime;
        const seconds = (timeDiff / 1000).toFixed(2); // Convert milliseconds to seconds and fix to 2 decimal places
        document.getElementById('message').innerText = `Well done! You finished in ${seconds} seconds.`;

        // Create and display the "share results" button
        const shareButton = document.createElement('button');
        shareButton.textContent = `Share Results`;
        shareButton.addEventListener('click', function() {
            const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            alert(`I finished today's ACS Daily (${formattedDate}) in ${seconds} seconds! Try and beat my score!`);
        });
        document.getElementById('message').appendChild(shareButton);

        startTime = null; // Reset startTime
    }
}


function moveToNext(cell, row, col) {
    let nextCell;
    if (selectedDirection === 'row') {
        nextCell = document.getElementById(`cell-${row}-${col + 1}`);
    } else {
        nextCell = document.getElementById(`cell-${row + 1}-${col}`);
    }
    if (cell.value.length === cell.maxLength && nextCell) {
        nextCell.focus();
    }
}

function moveToPrev(cell, row, col) {
    let prevCell;
    if (selectedDirection === 'row') {
        prevCell = document.getElementById(`cell-${row}-${col - 1}`);
    } else {
        prevCell = document.getElementById(`cell-${row - 1}-${col}`);
    }
    if (prevCell) {
        prevCell.focus();
    }
}

function handleKey(event, row, col) {
    startTimer(); // Start timer on first key press
    const cell = event.target;
    cell.value = cell.value.toUpperCase();  // Convert input to uppercase

    if (event.key === 'Backspace') {
        if (cell.value === '') {
            moveToPrev(cell, row, col);
        }
    } else if (event.key === 'Enter') {
        if (selectedDirection === 'row') {
            if (row < 4) {
                selectRow(row + 1);
                document.getElementById(`cell-${row + 1}-${0}`).focus(); // Focus on the first cell of the next row
            }
        } else {
            if (col < 4) {
                selectColumn(col + 1);
                document.getElementById(`cell-${0}-${col + 1}`).focus(); // Focus on the first cell of the next column
            }
        }
    } else if (event.key.length === 1) {
        moveToNext(cell, row, col);
    }
    
    highlightRowOrColumn(selectedDirection, selectedIndex);
    checkCrossword();
}


function highlightRowOrColumn(direction, index) {
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.getElementById(`cell-${r}-${c}`);
            cell.classList.remove('highlight');
        }
    }

    if (direction === 'row') {
        for (let c = 0; c < 5; c++) {
            const cell = document.getElementById(`cell-${index}-${c}`);
            cell.classList.add('highlight');
        }
        document.querySelectorAll('#clues p').forEach(clue => clue.classList.remove('clue-highlight'));
        document.getElementById(`clue-row-${index}`).classList.add('clue-highlight');
    } else if (direction === 'column') {
        for (let r = 0; r < 5; r++) {
            const cell = document.getElementById(`cell-${r}-${index}`);
            cell.classList.add('highlight');
        }
        document.querySelectorAll('#clues p').forEach(clue => clue.classList.remove('clue-highlight'));
        document.getElementById(`clue-column-${index}`).classList.add('clue-highlight');
    }
}

function selectRow(rowIndex) {
    // Highlight the row
    const row = document.getElementById(`row-${rowIndex}`);
    row.classList.add('selected');

    // Find the first empty input in the row and focus on it
    const inputs = row.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].focus();
            break;
        }
    }
}

function selectColumn(colIndex) {
    // Highlight the column
    const inputs = document.querySelectorAll(`#crossword .row input:nth-child(${colIndex + 1})`);
    inputs.forEach(input => input.parentElement.classList.add('selected'));

    // Find the first empty input in the column and focus on it
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].focus();
            break;
        }
    }
}


function selectRow(row) {
    selectedDirection = 'row';
    selectedIndex = row;
    highlightRowOrColumn('row', row);
}

function selectColumn(col) {
    selectedDirection = 'column';
    selectedIndex = col;
    highlightRowOrColumn('column', col);
}

function toggleDirection(row, col) {
    if (selectedDirection === 'row') {
        selectedDirection = 'column';
        selectedIndex = col;
        highlightRowOrColumn('column', col);
    } else {
        selectedDirection = 'row';
        selectedIndex = row;
        highlightRowOrColumn('row', row);
    }
}

function checkCrossword() {
    let correct = true;
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.getElementById(`cell-${r}-${c}`);
            if (cell.value.toUpperCase() !== correctAnswers[r][c]) {
                correct = false;
                break;
            }
        }
        if (!correct) break;
    }
    if (correct) {
        stopTimer(); // Stop timer when crossword is correct
    }
}

// Event listener for cell clicks
document.querySelectorAll('#crossword input[type="text"]').forEach(cell => {
    cell.addEventListener('click', function() {
        const [row, col] = this.id.split('-').slice(1).map(Number);
        if (selectedDirection === 'row') {
            selectedIndex = row;
        } else {
            selectedIndex = col;
        }
        highlightRowOrColumn(selectedDirection, selectedIndex);
        this.focus();
    });
    cell.addEventListener('dblclick', function() {
        const [row, col] = this.id.split('-').slice(1).map(Number);
        toggleDirection(row, col);
        this.focus();
    });
});


