/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
// const input = '1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--'

function solve(boardString) {
  // step =  шаг-длина подмассива (r строка)
  // boxSize - размер блока 3*3
  let size = Math.sqrt(boardString.length);
  let boxSize = Math.sqrt(size);
  // console.log('size', size, 'boxSize', boxSize);

  // преобразование строки во вложенный массив
  const board = [];
  let boardStringArr = [...boardString];
  for (let i = 0; i < boardStringArr.length; i += size) {
    board.push(boardStringArr.slice(i, i + size));
  }
  // console.table(board);

  // ищем пустые ячейки, r = строка, c = колонна
  const findEmpty = (board) => {
    for (let r = 0; r < size; r += 1) {
      for (let c = 0; c < size; c += 1) {
        if (board[r][c] === '-') {
          // console.log([r, c]);
          return [r, c];
        }
      }
    }
    // если все ячейки заполнены
    return null;
  };

  // проверяет на уникальность подставляемого числа из ф. solveRekursia по строке, по столбцу и в блоке
  // num = подставляемое число, pos - пустая ячейка, куда подставляем
  const validate = (num, pos, board) => {
    const [r, c] = pos;

    // проверка строки, что данное число уникально, в данной строке
    for (let i = 0; i < size; i += 1) {
      // console.log('проверка строки',num);
      if (board[i][c] === num && i !== r) {
        return false;
      }
    }

    // проверка столбца, что данное число уникально, в данном столбце
    for (let i = 0; i < size; i++) {
      // console.log('проверка столбца' ,num);
      if (board[r][i] === num && i !== c) {
        return false;
      }
    }

    // проверка box на уникальность числа
    const boxRow = Math.floor(r / boxSize) * boxSize; // где начинается сектор в строке
    const boxCol = Math.floor(c / boxSize) * boxSize; // где начинается сектор в столбце

    // console.log(r, c , boxSize, boxRow, boxCol);

    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxCol; j < boxCol + boxSize; j++) {
        // console.log('проверка бокса',i, j, board[i][j], num);
        if (board[i][j] === num && i !== r && j !== c) {
          return false;
        }
      }
    }
    return true;
  };

  // создание рекурсивной функции, которая подставляет числа 1-9 в пустые ячейки
  function solveRekursia() {
    const currPos = findEmpty(board);

    // когда функ. findEmpty не находит пустых ячеек, то возвращает null, а значит решение найдено
    if (currPos === null) {
      return true;
    }

    for (let i = 1; i <= size; i++) {
      // для подставления в пустые ячейки, число=i преобразуем к строке
      const currNum = i.toString();

      const isValid = validate(currNum, currPos, board);
      // console.log('Подставляемое число (currNum) ', currNum,'Текущая позиция, куда подставляем (currPos) ', currPos,'Результат ф validate (isValid) ', isValid);

      // если после проверки  ф validate (isValid) возвращает true, меняем пустую ячейку на найденное число
      if (isValid) {
        const [x, y] = currPos;
        board[x][y] = currNum;

        // продолжаем подставлять числа до конца, если ошибок нет, вернем true
        if (solveRekursia()) {
          return true;
        }
        // если появилась ошибка, возвращаемся и первое найденное число меняем обратно на пустое, подставим следующее по итерации
        board[x][y] = '-';
      }
    }

    // если дошли до конца, и не нашли решение
    return false;
  }

  solveRekursia();

  return board;
}

// console.log(solve(input));
// console.log(solve());
/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {
  const str = board.flat().join('');
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] !== '-') {
      return true;
    }
    return false;
  }
}
// console.log(isSolved(solve(input)));
/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {
  return console.table(board);
}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
