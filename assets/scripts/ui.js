const store = require('./store.js')

const signUpSuccess = data => {
  console.log('My signed up user data is.. ', data)
  $('#message').text('Signed up successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('input:text, input:password').val('')
  console.log('signUpSuccess ran. Data is : ', data)
}

const signUpFailure = error => {
  if (error.responseJSON.password_confirmation[0] === "doesn't match Password") {
    $('#message').text('Passwords must be the same')
    $('#message').removeClass()
    $('#message').addClass('failure')
  } else {
    $('#message').text('Error on sign up')
    $('#message').removeClass()
    $('#message').addClass('failure')
    $('input:text, input:password').val('')
  }
}

const signInSuccess = data => {
  // hide sign-in/up, show logout
  $('#sign-up-container, #sign-in-container, #change-password,' +
    '#show-games-container, #start-game, #logout, #change-password').toggleClass('hidden')
  console.log('My signed in user data is.. ', data)
  store.user = data.user
  $('#message').text('Signed in successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('input:text, input:password').val('')
  console.log('signInSuccess ran. Data is : ', data)
}

const signInFailure = error => {
  $('#message').text('Error on sign in')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('input:text, input:password').val('')
  console.log('signInFailure ran. Error is: ', error)
}

const logoutSuccess = data => {
  // hide sign-in/up, show logout
  $('#sign-up-container, #sign-in-container').toggleClass('hidden', false)
  $('#game-elements, #start-game, #show-games-container, ' +
  '#change-password, #logout').toggleClass('hidden', true)
  $('#display-games').html('') // clear display games
  $('#message').text('Logout successful')
  store.user = null
  $('#message').removeClass()
  $('#message').addClass('success')
  $('input:text, input:password').val('')
  console.log('logoutSuccess ran. Data is: ', data)
}

const logoutFailure = error => {
  $('#message').text('Error on logout')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.log('logoutFailure ran. Error is: ', error)
}

const changePasswordSuccess = data => {
  console.log('My change password user data is.. ', data)
  $('#message').text('Changed password successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('input:text, input:password').val('')
  console.log('changePasswordSuccess ran. Data is : ', data)
}

const changePasswordFailure = error => {
  $('#message').text('Error on changePassword')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.log('changePasswordFailure ran. Error is: ', error)
}

const getAllGamesSuccess = data => {
  $('#display-games').html('') // clear div
  $('#display-games').html(`
    <table id="prev-game">
    <caption>Previous Games</caption>
      <tr>
        <th>ID#</th>
        <th>Condition</th>
        <th>Status</th>
      </tr>
    </table>
    `)

  if (data.games.length > 0) {
    data.games.forEach(game => {
      const complete = game.over ? 'complete' : 'in progress'
      $('#prev-game').append(`
        <tr>
          <td>${game.id}</td>
          <td>
            <table id="mini-board">
              <tr>
                <td>${game.cells[0]}</td>
                <td>${game.cells[1]}</td>
                <td>${game.cells[2]}</td>
              </tr>
              <tr>
                <td>${game.cells[3]}</td>
                <td>${game.cells[4]}</td>
                <td>${game.cells[5]}</td>
              </tr>
              <tr>
                <td>${game.cells[6]}</td>
                <td>${game.cells[7]}</td>
                <td>${game.cells[8]}</td>
              </tr>
            </table>
          </td>
          <td>${complete}</td>
        </tr>
       `)
    })
  } else {
    $('#prev-game').append('<tr><td colspan="3">No games associated with this user</td></tr>')
  }
}

const getAllGamesFailure = error => {
  $('#display-games').text('') // clear div
  $('#message').text('Error on get games')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.log('getAllGamesFailure ran. Error is: ', error)
}

const getOneGameSuccess = data => {
  $('#display-games').html('') // clear div
  $('#display-games').html(`
    <table id="prev-game">
    <caption>Previous Game</caption>
      <tr>
        <th>ID#</th>
        <th>Condition</th>
        <th>Status</th>
      </tr>
    </table>
    `)
  const complete = data.game.over ? 'complete' : 'in progress'
  $('#prev-game').append(`
    <tr>
      <td>${data.game.id}</td>
      <td>
        <table id="mini-board">
          <tr>
            <td>${data.game.cells[0]}</td>
            <td>${data.game.cells[1]}</td>
            <td>${data.game.cells[2]}</td>
          </tr>
          <tr>
            <td>${data.game.cells[3]}</td>
            <td>${data.game.cells[4]}</td>
            <td>${data.game.cells[5]}</td>
          </tr>
          <tr>
            <td>${data.game.cells[6]}</td>
            <td>${data.game.cells[7]}</td>
            <td>${data.game.cells[8]}</td>
          </tr>
        </table>
      </td>
      <td>${complete}</td>
    </tr>
   `)
}

const getOneGameFailure = error => {
  $('#display-games').text('') // clear div
  $('#message').text('Error on get game')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.log('getOneGameFailure ran. Error is: ', error)
}

const createGameSuccess = data => {
  // hide sign-in/up, show logout
  $('#display-games').html('') // clear display games
  $('#start-game').toggleClass('hidden', true)
  $('#game-elements').toggleClass('hidden', false)
  $('#game-status').text("Player x's turn")

  store.game = data.game
}

const createGameFailure = error => {
  $('#message').html('')
  $('#message').prepend('Error on startGame')
  console.log('createGameFailure ran. Error is: ', error)
}

const updateGameSuccess = data => {
  console.log('move made.')
}

const updateGameFailure = error => {
  $('#message').html('')
  $('#message').prepend('Error, token not placed')
  console.log('updateGameFailure ran. Error is: ', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  logoutSuccess,
  logoutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  getAllGamesSuccess,
  getAllGamesFailure,
  getOneGameSuccess,
  getOneGameFailure,
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure
}
