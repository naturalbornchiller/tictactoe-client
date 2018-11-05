const store = require('./store.js')

const url = 'https://tic-tac-toe-wdi.herokuapp.com'

const signUp = data => {
  return $.ajax({
    url: `${url}/sign-up`,
    method: 'POST',
    data
  })
}

const signIn = data => {
  return $.ajax({
    url: `${url}/sign-in`,
    method: 'POST',
    data
  })
}

const logout = () => {
  console.log(store)
  return $.ajax({
    url: `${url}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = data => {
  console.log(data)
  return $.ajax({
    url: `${url}/change-password`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getAllGames = () => {
  return $.ajax({
    url: `${url}/games`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getOneGame = id => {
  return $.ajax({
    url: `${url}/games/${id}`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const startGame = () => {
  return $.ajax({
    url: `${url}/games`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {}
  })
}

const updateGame = data => {
  return $.ajax({
    url: `${url}/games/${store.game.id}`,
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
