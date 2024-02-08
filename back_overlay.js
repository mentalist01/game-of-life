
        const rows = 50;
        const cols =80;
        let grid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
        let running = false;

        const patterns = [
          // Стрела
          [
              [10, 10],
              [11, 10],
              [12, 10],
              [13, 10],
              [14, 10],
              [14, 9],
              [14, 8],
              [13, 7],
              [12, 6],
              [11, 5],
              [10, 5],
              [9, 6],
              [8, 7],
              [7, 8]
          ],
          // Планер
          [
              [20, 20],
              [21, 20],
              [22, 20],
              [22, 19],
              [21, 18]
          ],
          // Звезда
    [
        [15, 15], [14, 14], [14, 15], [14, 16], [15, 14], [15, 16], [16, 14], [16, 15], [16, 16]
    ],
    // Пятигушка
    [
        [10, 10], [10, 11], [10, 12], [9, 11], [11, 11]
    ],
    // Галактика Кока
    [
        [20, 20], [20, 21], [20, 22], [21, 20], [21, 22], [22, 20], [22, 21]
    ],
      ];

      
      clearGrid();
        startGame();

        function startGame() {
            running = true;
            loop();
        }

        function stopGame() {
            running = false;
        }

        function randomPattern() {
            const index = Math.floor(Math.random() * patterns.length);
            return patterns[index];
        }



        function placeRandomPatterns() {
    const patternCount = 4;
    for (let i = 0; i < patternCount; i++) {
        const randomPatternToPlace = randomPattern();
        const xOffset = Math.floor(Math.random() * (rows - 5)); // 5 - максимальная высота фигуры
        const yOffset = Math.floor(Math.random() * (cols - 5)); // 5 - максимальная ширина фигуры
        placePattern(randomPatternToPlace, xOffset, yOffset);
    }
}

function placePattern(pattern, xOffset, yOffset) {
    pattern.forEach(([x, y]) => {
        grid[(x + xOffset) % rows][(y + yOffset) % cols] = true;
    });
}

function clearGrid() {
    grid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    // Генерируем 4 случайные фигуры и размещаем их на сетке
    placeRandomPatterns();
    renderGrid();
}



        function loop() {
            if (!running) return;
            updateGrid();
            renderGrid();
            setTimeout(loop, 500); // Увеличенный интервал времени
        }

        function updateGrid() {
            const newGrid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const neighbors = countNeighbors(i, j);
                    if (grid[i][j] && (neighbors === 2 || neighbors === 3)) {
                        newGrid[i][j] = true;
                    } else if (!grid[i][j] && neighbors === 3) {
                        newGrid[i][j] = true;
                    }
                }
            }
            grid = newGrid;
        }

        function countNeighbors(x, y) {
            let count = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    const row = (x + i + rows) % rows;
                    const col = (y + j + cols) % cols;
                    if (grid[row][col]) {
                        count++;
                    }
                }
            }
            if (grid[x][y]) {
                count--;
            }
            return count;
        }

        function renderGrid() {
            const gridContainer = document.getElementById('grid');
            gridContainer.innerHTML = '';
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    if (grid[i][j]) {
                        cell.classList.add('alive');
                    }
                    cell.onclick = () => {
                        grid[i][j] = !grid[i][j];
                        renderGrid();
                    };
                    gridContainer.appendChild(cell);
                }
            }
        }

        renderGrid();