// Получаем элемент canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Определение размеров каждой клетки и объектов животных
let cellsCount = 50;

let n = cellsCount,
  m = cellsCount;

let currentAnimal = 1;

let cellWidth = canvas.width / n;
let cellHeight = canvas.height / m;
let speciesArray = [undefined, "#f7b731", "#f44336", "#4caf50"];

// Проверка на волка, зайца или оленя
function isWolf(x) {
  return x >= 2 && x < 3;
}
function isHare(x) {
  return x >= 1 && x < 2;
}
function isDeer(x) {
  return x >= 3 && x < 4;
}
// Определение вида, возвращает число 1, 2 или 3
function whatSpecie(x) {
  return Math.floor(x);
}
// Опредедяем сколько шагов надо чтобы умереть волку, от 1 до 9
let stepsToMakeWolfDead = 9;
// Лимит количества зайцев на карте
let hareLimit = 250;

// Создаем массив клеток, или получаем из локалки, если есть сохраненный
let cellsArr = localStorage.getItem("cellsArr");
if (cellsArr) {
  cellsArr = JSON.parse(cellsArr);
  updateCanv(cellsArr);
} else {
  cellsArr = new Array(n);
}
// Также нам нужно при обновлении массива, добавлять его в локальное хранилище
// function updateCellsArrayInLocalStorage(arr) {
//   localStorage.setItem("cellsArr", JSON.stringify(arr));
// }

// Заполняем массив значениями
for (let i = 0; i < n; i++) {
  cellsArr[i] = new Array(m);
  for (let j = 0; j < m; j++) {
    cellsArr[i][j] = 0;
  }
}
// Разбиение canvas на n строк и m столбцов
for (let i = 0; i < cellsArr.length; i++) {
  for (let j = 0; j < cellsArr[i].length; j++) {
    const x = i * cellWidth;
    const y = j * cellHeight;
    // ctx.beginPath();
    // ctx.moveTo(x, y);
    // ctx.lineTo(x + cellWidth, y);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(x, y);
    // ctx.lineTo(x, y + cellHeight);
    // ctx.stroke();
  }
}

// При зажатии и движении мыши по канвасу, будут заполняться квадратики

let isSame;

function movefillCellsManually(event) {
  // Получим номера квадратика по строке и столбцу
  let x = event.offsetX;
  let y = event.offsetY;
  x = Math.floor(x / cellWidth);
  y = Math.floor(y / cellHeight);
  console.clear()
  console.log(x)
  console.log(y);
  
  if(x <= n-1 && y <= m-1){
    if (
      ((isSame && !(isSame[0] === x && isSame[1] === y)) || !isSame) &&
      x <= 49 &&
      y <= 49
    ) {
      if (cellsArr[y][x] == 0) {
        // Избавляемся от бага, когда клетку невозможно нарисовать, потому что на ней стоит курсор
        isSame = [x, y];
  
        ctx.fillStyle = speciesArray[currentAnimal];
        ctx.fillRect(
          x * cellWidth + 1,
          y * cellHeight + 1,
          cellWidth - 2.1,
          cellHeight - 2.1
        );
        cellsArr[y][x] = currentAnimal;
      } else {
        isSame = [x, y];
  
        ctx.clearRect(
          x * cellWidth + 1,
          y * cellHeight + 1,
          cellWidth - 2.1,
          cellHeight - 2.1
        );
        cellsArr[y][x] = 0;
      }
    }
  }
}

function clickFillCellsManually(event) {
  // Получим номера клетки по строке и столбцу
  let x = event.offsetX;
  let y = event.offsetY;
  x = Math.floor(x / cellWidth);
  y = Math.floor(y / cellHeight);
  if (x <= n-1 && y <= m-1) {
    if (cellsArr[y][x] == 0) {
      ctx.fillStyle = speciesArray[currentAnimal];
      ctx.fillRect(
        x * cellWidth + 1,
        y * cellHeight + 1,
        cellWidth - 2.1,
        cellHeight - 2.1
      );
      cellsArr[y][x] = currentAnimal;
    } else {
      ctx.clearRect(
        x * cellWidth + 1,
        y * cellHeight + 1,
        cellWidth - 2.1,
        cellHeight - 2.1
      );
      cellsArr[y][x] = 0;
    }
  }
}

// Разделяем событие клик на два события
canvas.addEventListener("mousedown", function (event) {
  let lastClickX = event.clientX;
  let lastClickY = event.clientY;
  canvas.addEventListener(
    "mouseup",
    function (event) {
      if (event.clientX === lastClickX && event.clientY === lastClickY) {
        // кнопка мыши была нажата и отпущена в одной и той же точке
        clickFillCellsManually(event);
      }
    },
    {
      once: true,
    }
  );
});

canvas.addEventListener("mousedown", function (event) {
  canvas.addEventListener("mousemove", movefillCellsManually);
});
document.addEventListener("mouseup", function (event) {
  canvas.removeEventListener("mousemove", movefillCellsManually);
});

// Отрисовка массива
function updateCanv(cells) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      const x = i * cellWidth;
      const y = j * cellHeight;
      // ctx.beginPath();
      // ctx.moveTo(x, y);
      // ctx.lineTo(x + cellWidth, y);
      // ctx.stroke();
      // ctx.beginPath();
      // ctx.moveTo(x, y);
      // ctx.lineTo(x, y + cellHeight);
      // ctx.stroke();
      if (cells[j][i] > 0) {
        ctx.fillStyle = speciesArray[whatSpecie(cells[j][i])];
        ctx.fillRect(
          i * cellWidth + 1,
          j * cellHeight + 1,
          cellWidth - 2.1,
          cellHeight - 2.1
        );
      }
    }
  }
}

// function fillRandomCells(cells) {
//   for (let i = 0; i < cells.length; i++) {
//     for (let j = 0; j < cells[i].length; j++) {
//       cells[i][j] = Math.round(Math.random());
//     }
//   }
// }

// Логика игры
// Считает сколько рядом любых живых соседей
function countAnyLivingNeighbours(arr, i, j) {
  let count = 0;
  if (i > 0 && j > 0 && arr[i - 1][j - 1] > 0) count++;
  if (i > 0 && arr[i - 1][j] > 0) count++;
  if (i > 0 && j < arr[i].length - 1 && arr[i - 1][j + 1] > 0) count++;
  if (j > 0 && arr[i][j - 1] > 0) count++;
  if (j < arr[i].length - 1 && arr[i][j + 1] > 0) count++;
  if (i < arr.length - 1 && j > 0 && arr[i + 1][j - 1] > 0) count++;
  if (i < arr.length - 1 && arr[i + 1][j] > 0) count++;
  if (i < arr.length - 1 && j < arr[i].length - 1 && arr[i + 1][j + 1] > 0)
    count++;
  return count;
}
// Считает сколько рядом соседей вида specie
function countLivingConcreteNeighbours(arr, i, j, specie) {
  let count = 0;
  specie = whatSpecie(specie);
  if (i > 0 && j > 0 && arr[i - 1][j - 1] === specie) count++;
  if (i > 0 && arr[i - 1][j] === specie) count++;
  if (i > 0 && j < arr[i].length - 1 && arr[i - 1][j + 1] === specie) count++;
  if (j > 0 && arr[i][j - 1] === specie) count++;
  if (j < arr[i].length - 1 && arr[i][j + 1] === specie) count++;
  if (i < arr.length - 1 && j > 0 && arr[i + 1][j - 1] === specie) count++;
  if (i < arr.length - 1 && arr[i + 1][j] === specie) count++;
  if (
    i < arr.length - 1 &&
    j < arr[i].length - 1 &&
    arr[i + 1][j + 1] === specie
  )
    count++;
  return count;
}

// Логика волков

// Находит ближайшую живую клетку, кроме самих волков
function findNearestLivingCell(x, y, arr) {
  let minDistance = Infinity;
  let nearestCell = null;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] > 0 && !isWolf(arr[i][j])) {
        const distance = Math.sqrt((x - j) ** 2 + (y - i) ** 2);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCell = { x: j, y: i };
        }
      }
    }
  }

  if (nearestCell) {
    // Расстояние между желаемой клеткой и нашей по x и y
    const dx = nearestCell.x - x;
    const dy = nearestCell.y - y;

    if (dx == 0) {
      dy < 0 ? (nearestCell.y = y - 1) : (nearestCell.y = y + 1);
    } else if (dy == 0) {
      console.log(1);

      dx < 0 ? (nearestCell.x = x - 1) : (nearestCell.x = x + 1);
    } else if (Math.abs(dy) / Math.abs(dx) >= 2) {
      nearestCell.x = x;
      nearestCell.y = dy < 0 ? y - 1 : y + 1;
    } else if (
      Math.abs(dy) / Math.abs(dx) < 2 &&
      Math.abs(dy) / Math.abs(dx) > 1
    ) {
      nearestCell.x = x + Math.sign(dx);
      nearestCell.y = y + Math.sign(dy);
    } else if (Math.abs(dy) / Math.abs(dx) <= 0.5) {
      nearestCell.x = dx < 0 ? x - 1 : x + 1;
      nearestCell.y = y;
    } else if (
      Math.abs(dy) / Math.abs(dx) > 0.5 &&
      Math.abs(dy) / Math.abs(dx) <= 1
    ) {
      nearestCell.x = x + Math.sign(dx);
      nearestCell.y = y + Math.sign(dy);
    }
  }

  return nearestCell;
}

// считает сколько зайцев в массиве
function countHares(arr){
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if(isHare(arr[i][j])) count++;
    }
  }
  return count;
}

function updateArray(arr,stepsCounter) {
  let copyCellsArr = JSON.parse(JSON.stringify(arr));

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      // Поведениие волков
      // Если они делают шаг и не едят, то их голод повышается на 0.1. Если их голод достигает 0.stepsToMakeWolfDead, они умирают.
      if (
        arr[i][j] >= 2 &&
        arr[i][j] < Number.parseFloat(`2.${stepsToMakeWolfDead}`)
      ) {
        let oneStep = findNearestLivingCell(j, i, copyCellsArr);
        // Если кроме волков никого нет, волки победили
        if (!oneStep) {
          break;
        }
        // Если съел кого-то, восстанавливается обратно до двух
        if (
          copyCellsArr[oneStep.y][oneStep.x] != 0 &&
          !isWolf(copyCellsArr[oneStep.y][oneStep.x])
        ) {
          copyCellsArr[i][j] = 0;
          copyCellsArr[oneStep.y][oneStep.x] = 2;
        } else if (copyCellsArr[oneStep.y][oneStep.x] == 0) {
          // Если не съел, а сделал просто шаг, прибавляется 0.1 к голоду
          copyCellsArr[oneStep.y][oneStep.x] = copyCellsArr[i][j] + 0.1;
          copyCellsArr[i][j] = 0;
        }
      } else if (
        copyCellsArr[i][j] >= Number.parseFloat(`2.${stepsToMakeWolfDead}`) &&
        copyCellsArr[i][j] < 3
      ) {
        // Если голод достигает пика, волк становится нулем
        copyCellsArr[i][j] = 0;
      }

      // Поведение зайцев
      // Если рядом два зайца, то в пустой клетке появляется третий
      else if (copyCellsArr[i][j] === 0 && stepsCounter%3===0) {
        let hareNeighbours = countLivingConcreteNeighbours(arr,i,j,1);
        if(hareNeighbours==2 && countHares(copyCellsArr)<hareLimit){
          copyCellsArr[i][j] = 1;
        }
        // if (arr[i][j] === 0 && neighbours === 3) {
        //   copyCellsArr[i][j] = 1;
        // } else if (arr[i][j] === 1 && (neighbours > 3 || neighbours < 2)) {
        //   copyCellsArr[i][j] = 0;
        // }
      }
    }
  }
  return JSON.parse(JSON.stringify(copyCellsArr));
}

// Старт и стоп игры
const startButton = document.querySelector("#startButton");
let isRunning = false;

// Переменная для подсчета сколько шагов было выполнено всего
let stepsCounter = 0;

function toggleStart() {
  if (isRunning) {
    startButton.innerHTML = "&#9654;"; // Change back to start arrow
    clearInterval(intervalID);
    stopped = true;
  } else {
    startButton.innerHTML = "&#10074;&#10074;"; // Change to pause icon
    intervalID = setInterval(start, 150);
    stopped = false;
  }
  isRunning = !isRunning;
}

let stopped = true;
startButton.addEventListener("click", toggleStart);


// Функция обновления экрана игры
function start() {
  cellsArr = updateArray(cellsArr,stepsCounter++);
  updateCanv(cellsArr);
}

// Следующий шаг
function nextStep() {
  cellsArr = updateArray(cellsArr);
  updateCanv(cellsArr);
}

const nextButton = document.querySelector("#nextButton");

nextButton.addEventListener("click", nextStep);

// Выбор вида клеток
let species = document.querySelector(".species");
let speciesChildren = species.children;

species.addEventListener("click", function (event) {
  if (event.target.closest(".sp_ch")) {
    for (let child of speciesChildren) {
      child.classList.remove("cell-active");
    }
    event.target.classList.add("cell-active");
    currentAnimal = Array.prototype.indexOf.call(speciesChildren, event.target);
  }
});


// Навигация по экранам игры
// Загрузка нужного экрана из sessionStorage при обновлении страницы
let mainScreen = document.querySelector('.container');
let levelsScreen = document.querySelector('.levels');
let gameScreen = document.querySelector('.game-screen');
let sandboxScreen = document.querySelector('.sandbox-container');

let goBackArrow = document.querySelector('.go-back-arrow');

let screensCollection = [mainScreen,levelsScreen,gameScreen,sandboxScreen];

let currentScr = sessionStorage.getItem('screen');

let lifeOverlay = document.querySelector("#grid");


// Показать какой-то из экранов. Принимает коллекцию экранов и индекс того, которого нужно показать. Скрывает все экраны, кроме нужного
function makeSomeScreenVisibleWithSomeCollection(screenCollection,id){
  currentScr = id;
  sessionStorage.setItem('screen',currentScr);
  screenCollection.forEach(item=>item.classList.remove('visible-screen'));
  screenCollection[id].classList.add('visible-screen');
  if(currentScr==3){
    document.body.classList.add('dark_body');
    
  }else{
    document.body.classList.remove('dark_body');
  }
  
  if(currentScr!=0 && currentScr!=3){
    goBackArrow.classList.add('visible-screen');
    
  }else{
    goBackArrow.classList.remove('visible-screen');
  }
  if(currentScr==2){
    lifeOverlay.style.display = "none";
  }else{
    lifeOverlay.style.display = "grid";
  }
  
}
function makeSomeScreenVisible(id){
  makeSomeScreenVisibleWithSomeCollection(screensCollection,id);
}

if(currentScr!=undefined){
  makeSomeScreenVisible(currentScr);
}else{
  makeSomeScreenVisible(0);
}

// При нажатии кнопки назад
goBackArrow.addEventListener('click',function(){
  if(currentScr == 2){
    if(!stopped){
      startButton.click();
    }
    clearArrayUpdateCanvas();
  }
  currentScr--;
  makeSomeScreenVisible(currentScr);
  
});

// При нажатии на Play, переходим к экрану уровней
const playButton = document.querySelector('.play-button');
playButton.addEventListener('click',function(){
  makeSomeScreenVisible(1);
});

// При нажатии create sandbox, открывается экран песочницы
const createSandboxButton = document.querySelector('.sandbox-button');
const fullyCreateSandbox = document.querySelector('.fully-create-sandbox');

const intermediateCanvas = document.getElementById("map-canvas");
const intermediateCanvasctx = intermediateCanvas.getContext("2d");

createSandboxButton.addEventListener('click',function(){
  makeSomeScreenVisible(3);
  
  
});
fullyCreateSandbox.addEventListener('click',function(){
  makeSomeScreenVisible(2);
});

// Очистка массива и обновление canvas
function clearArray(){
  for (let i = 0; i < cellsArr.length; i++) {
    for (let j = 0; j < cellsArr[i].length; j++) {
      cellsArr[i][j] = 0;
    }
  }
}
function clearArrayUpdateCanvas(){
  clearArray();
  updateCanv(cellsArr);
}


// Отрисовка примера клеточного поля на экране создания песочнницы
const widthRange = document.getElementById("width");
  const mapCanvas = document.getElementById("map-canvas");
  const canvasContext = mapCanvas.getContext("2d");

  // Функция для отрисовки клеточного поля
  function drawGrid(size) {
    const cellSize = 10; // Размер каждой клетки
    const numCells = Math.floor(size / cellSize); // Количество клеток в строке и столбце

    mapCanvas.width = size;
    mapCanvas.height = size;

    canvasContext.clearRect(0, 0, size, size);

    canvasContext.strokeStyle = "#000";

    // Рисуем горизонтальные линии
    for (let i = 0; i <= numCells; i++) {
      canvasContext.beginPath();
      canvasContext.moveTo(0, i * cellSize);
      canvasContext.lineTo(size, i * cellSize);
      canvasContext.stroke();
    }

    // Рисуем вертикальные линии
    for (let j = 0; j <= numCells; j++) {
      canvasContext.beginPath();
      canvasContext.moveTo(j * cellSize, 0);
      canvasContext.lineTo(j * cellSize, size);
      canvasContext.stroke();
    }
  }

  // Обработчик изменения значения ползунка
  widthRange.addEventListener("input", function() {
    const size = parseInt(widthRange.value);
    drawGrid(size);
  });

  // Инициализация сетки с начальным размером
  const initialSize = parseInt(widthRange.value);
  drawGrid(initialSize);






// Чтобы выводилось нужное число при перетаскивании ползунка:
const range = document.getElementById("width");
const sizeSetting = document.querySelector("#size-setting");
sizeSetting.textContent = `Размер: `+range.value/10 + `x` + range.value/10;

range.addEventListener("input", function() {
  sizeSetting.textContent = `Размер: `+range.value/10 + `x` + range.value/10;
});



// Создание песочницы:
fullyCreateSandbox.addEventListener('click',function(){
  cellsCount = range.value/10;

  n = cellsCount,
  m = cellsCount; 
  cellWidth = canvas.width / n;
  cellHeight = canvas.height / m;
});