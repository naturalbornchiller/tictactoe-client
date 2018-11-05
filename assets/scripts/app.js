'use strict'
const events = require('./events.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // account stuff
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#logout').on('click', events.onLogout)
  $('#change-password').on('submit', events.onChangePassword)
  // show games
  $('#get-all-games').on('click', events.onGetAllGames)
  $('#get-one-game').on('submit', events.onGetOneGame)
  // create board
  $('#start-game, #reset').on('click', events.onStartGame)
  $('#message, #logout').scroll(function () {
    $('.fixed').css('top', $(this).scrollTop())
  })
})
