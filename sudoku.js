/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
let input =
  "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--";

function solve(boardString) {
  // преобразование строки во вложенный массив
  const arr = [];
  let step = Math.sqrt(boardString.length);
  let boxSize = Math.sqrt(step);
  let boardStringArr = [...boardString];
  for (let i = 0; i < boardStringArr.length; i += step) {
    arr.push(boardStringArr.slice(i, i + step));
  }
  console.log(arr);

  // ищем свободные ячейки
  const findEmpty = (arr) => {
    for (let r = 0; r < step; r++) {
      for (let c = 0; c < step; r++) {
        if (arr[r][c] === "-") {
          return [r, c];
        }
      }
    }
    //Проверка
    // если все ячейки заполнены
    return null;
  };

  const validate = (num, pos, board) => {
    const [r, c] = pos;

    // проверка строки, что данное число уникально, в данной строке
    for (let i = 0; i < step; i++) {
      if (arr[i][c] === num && i !== r) {
        return false;
      }
    }

    // проверка столбца, что данное число уникально, в данном столбце
    for (let i = 0; i < step; i++) {
      if (arr[r][i] === num && i !== c) {
        return false;
      }
    }

    // проверка box на уникальность числа
    const boxRow = Math.floor(r / boxSize) * boxSize; // где начинается сектор в строке
    const boxCol = Math.floor(c / boxSize) * boxSize; // где начинается сектор в столбце

    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxCol; i < boxCol + boxSize; j++) {
        if (arr[i][j] === num && i !== r && j !== c) {
          return false;
        }
      }
    }
    return true;
  };

  // создание рекурсивной функции
  function solveRekursia() {
    const currPos = findEmpty(arr);

    for (let i = 1; i < step + 1; i++) {
      const currNum = i.toString();
      const isValid = validate(currNum, currPos, arr);

      if (isValid) {
        const [x, y] = currPos;
        board[x][y] = currNum;

        if (solve()) {
          return true;
        }

        board[x][y] = "-";
      }
    }
  }
  solveRekursia();
  return arr;
}
solve(input);

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
