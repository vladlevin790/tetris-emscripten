const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

const BLOCK_COLORS = [
    'cyan',    // I
    'yellow',  // O
    'green',   // S
    'red',     // Z
    'purple',  // T
    'orange',  // L
    'blue'     // J
];

let drawingCanvas, drawingContext;
let boardPointer;
let scoreDisplayElement, levelDisplayElement;
let fallingInterval;


document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const gameCanvas = document.getElementById('gameCanvas');

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        welcomeMessage.style.display = 'none'; 
        gameCanvas.style.display = 'block'; 
        initiateGame(); 
        startButton.style.borderRadius = "0px 0px 5px 5px";
    });
});

Module.onRuntimeInitialized = function() {
    drawingCanvas = document.getElementById('gameCanvas');
    drawingContext = drawingCanvas.getContext('2d');
    scoreDisplayElement = document.getElementById('score');
    levelDisplayElement = document.getElementById('level');

    scoreDisplayElement.style.display = 'none';
    levelDisplayElement.style.display = 'none';

    boardPointer = Module.ccall('getBoardPointer', 'number');
    initializeKeyControls();

    document.getElementById('startButton').addEventListener('click', initiateGame);
};

function initiateGame() {
    scoreDisplayElement.style.display = 'block';
    levelDisplayElement.style.display = 'block';

    resetGameState();
    startFallingInterval();
    requestAnimationFrame(gameRenderLoop);
}

function resetGameState() {
    Module.ccall('resetGame', null, [], []);
    generateTetromino();
    refreshScoreAndLevel();
}

function fetchCurrentTetrominoColor() {
    const tetrominoType = Module.ccall('getCurrentTetrominoType', 'number');  
    return BLOCK_COLORS[tetrominoType];  
}

function startFallingInterval() {
    clearInterval(fallingInterval);
    fallingInterval = setInterval(() => {
        if (!Module.ccall('isGameOver', 'boolean')) {
            descendTetromino();
            refreshScoreAndLevel();
        } else {
            processGameOver();
        }
    }, Module.ccall('getSpeed', 'number'));
}

function gameRenderLoop() {
    renderGameBoard();
    requestAnimationFrame(gameRenderLoop);
}

function processGameOver() {
    clearInterval(fallingInterval);
    drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height); 
    alert("Game Over! Final Score: " + Module.ccall('getScore', 'number'));
}

function renderGameBoard() {
    drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            if (Module.HEAP32[(boardPointer >> 2) + row * GRID_WIDTH + col]) {
                drawSingleBlock(col, row, 'gray');
            }
        }
    }

    const currentTetrominoX = Module.ccall('getCurrentTetrominoX', 'number');
    const currentTetrominoY = Module.ccall('getCurrentTetrominoY', 'number');
    const tetrominoShapePtr = Module.ccall('getCurrentTetrominoShape', 'number');
    const currentColor = fetchCurrentTetrominoColor();  

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (Module.HEAP32[(tetrominoShapePtr >> 2) + i * 4 + j]) {
                drawSingleBlock(currentTetrominoX + j, currentTetrominoY + i, currentColor);  
            }
        }
    }
}

function drawSingleBlock(x, y, color) {
    drawingContext.fillStyle = color;
    drawingContext.fillRect(x * 20, y * 20, 20, 20);
    drawingContext.strokeStyle = '#333';
    drawingContext.strokeRect(x * 20, y * 20, 20, 20);
}

function refreshScoreAndLevel() {
    const scoreValue = Module.ccall('getScore', 'number');
    const levelValue = Module.ccall('getLevel', 'number');
    scoreDisplayElement.textContent = `Score: ${scoreValue}`;
    levelDisplayElement.textContent = `Level: ${levelValue}`;

    startFallingInterval();
}

function descendTetromino() {
    Module.ccall('moveDown', null, [], []);
}

function spinTetromino() {
    Module.ccall('rotateTetromino', null, [], []);
}

function shiftTetrominoLeft() {
    Module.ccall('moveLeft', null, [], []);
}

function shiftTetrominoRight() {
    Module.ccall('moveRight', null, [], []);
}

function generateTetromino() {
    Module.ccall('spawnTetromino', null, [], []);
}

function initializeKeyControls() {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 's':
                descendTetromino();
                break;
            case 'ы':
                descendTetromino();
                break;
            case 'w':
                spinTetromino();
                break;
            case 'ц':
                spinTetromino();
                break;
            case 'a':
                shiftTetrominoLeft();
                break;
            case 'ф':
                shiftTetrominoLeft();
                break;
            case 'd':
                shiftTetrominoRight();
                break;
            case 'в':
                shiftTetrominoRight();
                break;
            default:

                break;
        }
    });
}
