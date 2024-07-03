const correctAnswers = [
    ['B', 'A', 'B', 'A', '', 'K', 'H', 'A', 'K', 'I', '', 'S', 'T', 'Y', 'E'],
    ['A', 'R', 'U', 'M', '', 'Y', 'E', 'M', 'E', 'N', '', 'C', 'H','A', 'R'],
    ['T', 'I', 'T', 'O', '', 'I', 'S', 'A', 'A', 'C', '', 'A', 'R', 'M', 'S'],
    ['S', 'A', 'T', 'N', 'A', 'V', '', 'S', 'T', 'I', 'L', 'L', 'E', 'S', 'T'],
    ['', '', 'E', 'G', 'O', '', 'I', 'S', 'O', 'T', 'O', 'P', 'E', '', ''],
    ['O', 'A', 'R', '', 'N', 'E', 'T', '', 'N', 'E', 'D', '', 'P', 'A', 'W'],
    ['A', 'L', 'F', 'R', 'E', 'S', 'C', 'O', '', 'M', 'E', 'M', 'O', 'I', 'R'],
    ['S', 'O', 'L', 'O', '', 'P', 'H', 'O', 'N', 'E', '', 'B', 'I', 'K', 'E'],
    ['T', 'H', 'Y', 'M', 'O', 'L', '', 'H', 'E', 'N', 'B', 'A', 'N', 'E', 'S'],
    ['S', 'A', 'E', '', 'B', 'A', 'N', '', 'S', 'T', 'Y', '', 'T', 'N', 'T'],
    ['', '', 'F', 'A', 'I', 'N', 'E', 'S', 'T', '', 'T', 'U', 'T', '', ''],
    ['O', 'F', 'F', 'S', 'T', 'A', 'G', 'E', '', 'P', 'E', 'N', 'U', 'L', 'T'],
    ['V', 'I', 'E', 'S', '', 'D', 'A', 'T', 'E', 'R', '', 'C', 'R', 'E', 'E'],
    ['I', 'N', 'C', 'A', '', 'E', 'T', 'U', 'D', 'E', '', 'A', 'N', 'I', 'S'],
    ['D', 'O', 'T', 'Y', '', 'S', 'E', 'P', 'O', 'Y', '', 'P', 'S', 'S', 'T']
];

let selectedDirection = 'row';
let selectedIndex = 0;
let startTime = null;

// Start timer function
function startTimer() {
    if (!startTime) {
        startTime = new Date();
    }
}

// Stop timer function
function stopTimer() {
    if (startTime) {
        const endTime = new Date();
        const timeDiff = endTime - startTime;
        const seconds = (timeDiff / 1000).toFixed(2);
        document.getElementById('message').innerText = `Well done! You finished in ${seconds} seconds.`;

        // Share Results button
        const shareButton = document.createElement('button');
        shareButton.textContent = `Share Results`;
        shareButton.addEventListener('click', function() {
            const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            alert(`I finished today's ACS Daily (${formattedDate}) in ${seconds} seconds! Try and beat my score!`);
        });
        document.getElementById('message').appendChild(shareButton);

        startTime = null;
    }
}

// Move to next cell function
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

// Move to previous cell function
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

// Handle key press function
function handleKey(event, row, col) {
    startTimer();
    const cell = event.target;
    cell.value = cell.value.toUpperCase();

    if (event.key === 'Backspace') {
        if (cell.value === '') {
            moveToPrev(cell, row, col);
        }
    } else if (event.key === 'Enter') {
        if (selectedDirection === 'row') {
            if (row < 15) {
                selectRow(row + 1);
                document.getElementById(`cell-${row + 1}-0`).focus();
            }
        } else {
            if (col < 15) {
                selectColumn(col + 1);
                document.getElementById(`cell-0-${col + 1}`).focus();
            }
        }
    } else if (event.key.length === 1) {
        moveToNext(cell, row, col);
    }
    
    highlightRowOrColumn(selectedDirection, selectedIndex, row, col);
    checkCrossword();
}

// Get word boundaries function
function getWordBoundaries(direction, index, row, col) {
    let start = 0;
    let end = 14;

    if (direction === 'row') {
        for (let c = col; c >= 0; c--) {
            if (document.getElementById(`cell-${row}-${c}`).classList.contains('black')) {
                start = c + 1;
                break;
            }
        }
        for (let c = col; c < 15; c++) {
            if (document.getElementById(`cell-${row}-${c}`).classList.contains('black')) {
                end = c - 1;
                break;
            }
        }
    } else {
        for (let r = row; r >= 0; r--) {
            if (document.getElementById(`cell-${r}-${col}`).classList.contains('black')) {
                start = r + 1;
                break;
            }
        }
        for (let r = row; r < 15; r++) {
            if (document.getElementById(`cell-${r}-${col}`).classList.contains('black')) {
                end = r - 1;
                break;
            }
        }
    }

    return { start, end };
}

// Highlight row or column function
function highlightRowOrColumn(direction, index, row, col) {
    // Remove highlight from all cells
    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
            const cell = document.getElementById(`cell-${r}-${c}`);
            cell.classList.remove('highlight');
        }
    }

    const { start, end } = getWordBoundaries(direction, index, row, col);

    if (direction === 'row') {
        for (let c = start; c <= end; c++) {
            const cell = document.getElementById(`cell-${row}-${c}`);
            if (cell) cell.classList.add('highlight');
        }
        document.querySelectorAll('#clues p').forEach(clue => clue.classList.remove('clue-highlight'));
        const rowClue = document.getElementById(`clue-row-${row}`);
        if (rowClue) rowClue.classList.add('clue-highlight');
    } else if (direction === 'column') {
        for (let r = start; r <= end; r++) {
            const cell = document.getElementById(`cell-${r}-${col}`);
            if (cell) cell.classList.add('highlight');
        }
        document.querySelectorAll('#clues p').forEach(clue => clue.classList.remove('clue-highlight'));
        const colClue = document.getElementById(`clue-col-${col}`);
        if (colClue) colClue.classList.add('clue-highlight');
    }
}

// Select row function
function selectRow(row) {
    selectedDirection = 'row';
    selectedIndex = row;
    highlightRowOrColumn('row', row, row, 0);
}

// Select column function
function selectColumn(col) {
    selectedDirection = 'column';
    selectedIndex = col;
    highlightRowOrColumn('column', col, 0, col);
}

// Toggle direction function
function toggleDirection(row, col) {
    if (selectedDirection === 'row') {
        selectedDirection = 'column';
        selectedIndex = col;
        highlightRowOrColumn('column', col, row, col);
    } else {
        selectedDirection = 'row';
        selectedIndex = row;
        highlightRowOrColumn('row', row, row, col);
    }
}

// Check crossword function
function checkCrossword() {
    let correct = true;
    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
            const cell = document.getElementById(`cell-${r}-${c}`);
            if (cell && !cell.classList.contains('black') && cell.value.toUpperCase() !== correctAnswers[r][c]) {
                correct = false;
                break;
            }
        }
        if (!correct) break;
    }

    if (correct) {
        stopTimer();
    }
}

// Event listener to handle clicks on crossword cells
document.querySelectorAll('#crossword input[type="text"]').forEach(cell => {
    cell.addEventListener('click', function() {
        const [row, col] = this.id.split('-').slice(1).map(Number);
        if (selectedDirection === 'row') {
            selectedIndex = row;
        } else {
            selectedIndex = col;
        }
        highlightRowOrColumn(selectedDirection, selectedIndex, row, col);
        this.focus();
    });
    cell.addEventListener('dblclick', function() {
        const [row, col] = this.id.split('-').slice(1).map(Number);
        toggleDirection(row, col);
        this.focus();
    });
});

// Initialize crossword puzzle
function initializeCrosswordPuzzle() {
    // Load crossword cells and initialize event listeners
    // Assuming you have this part already set up
}



// Run the crossword puzzle initialization when the window loads
window.onload = initializeCrosswordPuzzle;
