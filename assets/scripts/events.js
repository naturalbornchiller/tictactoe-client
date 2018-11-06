const getFormFields = require('../../lib/get-form-fields.js')
const logic = require('./logic.js')
const api = require('./api.js')
const ui = require('./ui.js')
const startBoard = (`
  <div class="grid-item first-row first-col" id="0"></div>
  <div class="grid-item first-row second-col" id="1"></div>
  <div class="grid-item first-row" id="2"></div>
  <div class="grid-item second-row first-col" id="3"></div>
  <div class="grid-item second-row second-col" id="4"></div>
  <div class="grid-item second-row" id="5"></div>
  <div class="grid-item first-col" id="6"></div>
  <div class="grid-item second-col" id="7"></div>
  <div class="grid-item" id="8"></div>
  `)

const onSignUp = event => {
  event.preventDefault()
  const data = getFormFields(event.target)

  // send data to a server using an http request
  api.signUp(data)
    .then(ui.signUpSuccess) // if request successful
    .catch(ui.signUpFailure) // if request unsuccessful
}

const onSignIn = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess) // if request successful
    .catch(ui.signInFailure) // if request unsuccessful
}

const onLogout = event => {
  event.preventDefault()
  api.logout()
    .then(ui.logoutSuccess)
    .catch(ui.logoutFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess) // if request successful
    .catch(ui.changePasswordFailure) // if request unsuccessful
}

const onGetAllGames = event => {
  event.preventDefault()
  api.getAllGames()
    .then(ui.getAllGamesSuccess)
    .catch(ui.getAllGamesFailure)
}

const onGetOneGame = event => {
  event.preventDefault()
  const id = $('#get-game-by-id').val()
  api.getOneGame(id)
    .then(ui.getOneGameSuccess)
    .catch(ui.getOneGameFailure)
}

let player = 'o' // switches between even and odd, used to calculate turn
let gameOver = false // is game in terminal state?
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const onUpdateGame = event => {
  // prevent page refresh
  event.preventDefault()
  const target = $(event.target)

  // if spot is occupied by 'X' or 'O' or game is over,
  // do nothing
  if (target.text() !== '' || gameOver) {
    return
  } // otherwise update board

  const index = parseInt(target.attr('id')) // store index of current cell as int
  $('#game-status').html('')
  $('#game-status').prepend(`Player ${player}'s turn`)
  player = player === 'x' ? 'o' : 'x' // change player
  board[index] = player // update board array
  const gamePiece = (`<section class="game-pieces">${player}</section>`)
  target.prepend(gamePiece)

  // check for win
  if (logic.isWin(board, player)) {
    console.log('Game recognizes win!')
    gameOver = true // game is over
    $('#game-status').removeClass()
    $('#game-status').addClass('win')
    $('#game-status').html('')
    $('#game-status').prepend(`Player ${player} won!`)
  } else if (logic.isTie(board)) { // check for tie
    console.log('Game recognizes tie!')
    gameOver = true // game is over
    $('#game-status').removeClass()
    $('#game-status').addClass('tie')
    $('#game-status').html('')
    $('#game-status').prepend("It's a tie!")
  }

  // store values to update api
  const data = {
    index,
    value: player,
    over: gameOver
  }

  // update board in api
  api.updateGame(data)
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
}

const onStartGame = event => {
  event.preventDefault()
  // reset values
  player = 'o'
  gameOver = false
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  $('#game-status').html('')
  $('#game-status').removeClass()
  $('#game-status').addClass('game-items')
  api.startGame()
    .then(ui.createGameSuccess) // ui.onStartGameSuccess
    .catch(ui.createGameFailure) // ui.onStartGameFailure
  $('#grid').html(startBoard)
  $('.grid-item').on('click', onUpdateGame)
}

module.exports = {
  onSignUp,
  onSignIn,
  onLogout,
  onChangePassword,
  onGetAllGames,
  onGetOneGame,
  onStartGame,
  onUpdateGame
}
