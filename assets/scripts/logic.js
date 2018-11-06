/*
ex. start board

     |   |
   0 | 1 | 2
 ----+---+----
   3 | 4 | 5
 ----+---+----
   6 | 7 | 8
     |   |
*/

// CHECK IF TIE
const isTie = board => {
  return board.every(space => typeof space !== 'number')
}

// CHECK IF WIN
const isWin = (board, player) => {
  // if playerToken is on the board at each of the indexes in any
  // in any winning combo, return true
  const winCombos = [
    [0, 1, 2], // combo
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const isMatch = i => board[i] === player

  return winCombos.some(combo => combo.every(isMatch))
}

// // Check if row win
// const isRowWin = (board, player) => {
//   // true if board contains some row for which every spot === player
//   return board.some(row => row.every(spot => spot === player))
// }
//
// // check if column win
// const isColWin = (board, player) => {
//   // stores columns
//   const columns = []
//   // create columns up to the length of board (board contains 3 arrays)
//   for (let i = 0; i < board.length; i++) {
//     // new column
//     columns[i] = []
//     // for each boardrow take row[0] out of row
//     // and put it at the end of the newest column
//     board.forEach(row => columns[i].push(row.splice(0, 1)))
//     // current column gets every row's element zero.
//     // since the rows get one element shorter with
//     // each loop, you only have to call splice() on
//     // row[0].
//   }
//
//   // OR
//   // for (let j = 0; j < board.length; j++) {
//   //   columns[j] = []
//   //   for (let i = 0; i < board.length; i++) {
//   //     columns[j].push(board[i][j])
//   //   }
//   // }
//   // finally, this returns true if columns array contains a col
//   // for which every spot === player
//   return columns.some(col => col.every(spot => spot === player))
// }
//
// // Check if diagonal win
// const isDiagWin = (board, player) => {
//   // 2d array - as a board will always have only two diagonals
//   const diags = [[], []]
//   // first diagonal begins at element 0 of the first row
//   let ltr = 0 // goes right-to-left
//   // second diagonal begins at the last element of the first row
//   let rtl = board.length - 1 // goes left-to-right
//
//   board.forEach(row => {
//     // add board[0][0], [1][1], and [2][2] to first diag array
//     diags[0].push(row[ltr])
//     // add board[0][2], [1][1], and [2][0] to second diag array
//     diags[1].push(row[rtl])
//     ltr++ // move index right
//     rtl-- // move index left
//   })
//
//   // true if an array, diag, in diags contains only 'player' at each index
//   return diags.some(diag => diag.every(spot => spot === player))
// }
//
// // CHECK IF 2D WIN
// const isWin2D = (board, player) => {
//   // if ANY of these functions return true,
//   // then return true
//   return isRowWin(board, player) ||
//          isColWin(board, player) ||
//          isDiagWin(board, player)
// }

module.exports = {
  isTie,
  isWin
}
