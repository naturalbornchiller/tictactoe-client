const store = require('./store.js')

// hosts
const devURL = 'https://tic-tac-toe-wdi.herokuapp.com'
const prodUrl = 'https://aqueous-atoll-85096.herokuapp.com'

const signUp = data => {
  return $.ajax({
    url: `${prodUrl}/sign-up`,
    method: 'POST',
    data
  })
}

const signIn = data => {
  return $.ajax({
    url: `${prodUrl}/sign-in`,
    method: 'POST',
    data
  })
}

const logout = () => {
  console.log(store)
  return $.ajax({
    url: `${prodUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = data => {
  console.log(data)
  if (data.passwords.old !== data.passwords.new) {
    return $.ajax({
      url: `${prodUrl}/change-password`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data
    })
  }
  $('#message').text('New password cannot be same as old')
  $('#message').removeClass()
  $('#message').addClass('failure')
}

const getAllGames = () => {
  return $.ajax({
    url: `${prodUrl}/games`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getOneGame = id => {
  return $.ajax({
    url: `${prodUrl}/games/${id}`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const startGame = () => {
  return $.ajax({
    url: `${prodUrl}/games`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {}
  })
}

const updateGame = data => {
  return $.ajax({
    url: `${prodUrl}/games/${store.game.id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      game: {
        cell: {
          index: data.index,
          value: data.value
        },
        over: data.over
      }
    }
  })
}

module.exports = {
  signUp,
  signIn,
  logout,
  changePassword,
  getAllGames,
  getOneGame,
  startGame,
  updateGame
}
