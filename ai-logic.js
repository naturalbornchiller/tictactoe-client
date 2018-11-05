// TIC TAC TOE, BABY

/*
        ex. fc with startBoard = ["O",1 ,"X","X",4 ,"X", 6 ,"O","O"]

                           O |   | X
                           ---------    depth: 0
                           X |   | X    turn: 'X' (ai)
                           ---------
                             | O | O

                           score: +10

                     //       ||        \\

        O | X | X          O |   | X        O |   | X
        ---------          ---------        ---------   depth: 1
        X |   | X          X | X | X        X |   | X   turn: 'O' (hu)
        ---------          ---------        ---------
          | O | O            | O | O        X | O | O

        score: -10         score: +10       score: -10

      //          \\                      //        \\

O | X | X          O | X | X        O | O | X       O |   | X
---------          ---------        ---------       ---------   depth: 2
X | O | X          X |   | X        X |   | X       X | O | X   turn: 'X' (ai)
---------          ---------        ---------       ---------
  | O | O          O | O | O        X | O | O       X | O | O

score: -10         score: -10       score: +10      score: -10
terminal           terminal                         terminal
                                  //

                           O | O | X
                           ---------    depth: 3
                           X | X | X    turn: would be 'O' (hu)but no more spaces
                           ---------
                           X | O | O

                           score: +10
                           terminal
ex. start board

     |   |
   0 | 1 | 2
 ----+---+----
   3 | 4 | 5
 ----+---+----
   6 | 7 | 8
     |   |
*/

// original board
const startBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
// players and tokens
const huPlayer = 'X'
const aiPlayer = 'O'
// function call amount
let depth = -1

// CHECK AVAILABLE MOVES
const emptyIndexes = board => {
  return board.filter(space => space !== 'O' && space !== 'X')
}

// DETERMINE WIN
const win = (board, player) => {
  return (board[0] === player && board[1] === player && board[2] === player ||
          board[3] === player && board[4] === player && board[5] === player ||
          board[6] === player && board[7] === player && board[8] === player ||
          board[0] === player && board[3] === player && board[6] === player ||
          board[1] === player && board[4] === player && board[7] === player ||
          board[2] === player && board[5] === player && board[8] === player ||
          board[0] === player && board[4] === player && board[8] === player ||
          board[2] === player && board[4] === player && board[6] === player)
}

// FIND BEST MOVE
const minimax = function (newBoard, player, depth) {
  // increment depth
  depth++

  // available spots for this state
  const availableSpots = emptyIndexes(newBoard)

  // checks for terminal states (win/lose/tie)
  // if terminal, sends value up a node
  if (win(newBoard, huPlayer)) {
    return {score:depth-10}
  } else if (win(newBoard, aiPlayer)) {
    return {score:10-depth}
  } else if (availableSpots.length === 0) {
    return {score: 0}
  } // if NOT terminal continue

  // store all move-objects
  const moves = []

  // loop through available moves
  for (let i = 0; i < availableSpots.length; i++) {
    // movetotest holds index of an available spot
    const moveToTest = availableSpots[i]
    // store the index of the spot at new key in empty object
    const move = {}
    move.index = newBoard[moveToTest]

    // set availablespot to current player's token
    // removing the spot from the new board
    newBoard[moveToTest] = player

    // collect result of calling minimax on the opponent of current player
    // using the new board
    if (player === aiPlayer) {
      // call on human if ai made last move
      const result = minimax(newBoard, huPlayer)
      // score of moveobject equals the score returned by fc
      move.score = result.score
    } else {
      // call on ai if human made last move
      const result = minimax(newBoard, aiPlayer)
      // score of moveobject equals the score returned by fc
      move.score = result.score
    }

    // reset the spot to empty
    // so the next available move at this depth can be tested
    newBoard[moveToTest] = move.index

    // add move (containing index and score properties) to moves
    moves.push(move)

    // stores best move
    let bestMove

    // if it is ai's turn choose the move with the highest score from moves-array
    if (player === aiPlayer) { // get highestscore from moves array
      const bestAiScore = moves.reduce((best, next) => best > next ? best : next)
      // store the index of that move in bestmove
      bestMove = moves.indexOf(bestAiScore)
    } else { // if it's humans turn, get the lowest score
      // get lowestscore from array
      const bestHuScore = moves.reduce((best, next) => best < next ? best : next)
      // store it's index in bestmove
      bestMove = moves.indexOf(bestHuScore)
    }

    // return move with bestScore from moves array
    // if aiTurn then move is pos, if huTurn move is neg
    return moves[bestMove]
  }
}

// begin minimaxing
const bestSpotToMove = minimax(startBoard, aiPlayer)
