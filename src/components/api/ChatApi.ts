import axios from 'axios'

export const chatApi = {
  getUserExtrasMe,
  saveUserExtrasMe,
  registerTemp,
  fetchUsers
}
/*
function getMovies() {
  return instance.get('/api/movies')
}

function getMovie(imdbId) {
  return instance.get(`/api/movies/${imdbId}`)
}

function saveMovie(movie, token) {
  return instance.post('/api/movies', movie, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function deleteMovie(imdbId, token) {
  return instance.delete(`/api/movies/${imdbId}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function addMovieComment(imdbId, comment, token) {
  return instance.post(`/api/movies/${imdbId}/comments`, comment, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}
*/
function getUserExtrasMe(token: any) {
  return instance.get(`/api/userextras/me`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function saveUserExtrasMe(token: any, userExtra: any) {
  return instance.post(`/api/userextras/me`, userExtra, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}
function registerTemp(token: any, name: String) {
  return instance.get(`/registration/${name}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}
function fetchUsers(token: any) {
  return instance.get(`/fetchAllUsers`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}
// -- Axios

const instance = axios.create({
  baseURL: "http://localhost:9080"
})

instance.interceptors.response.use(response => {
  return response;
}, function (error) {
  if (error.response.status === 404) {
    return { status: error.response.status };
  }
  return Promise.reject(error.response);
});

// -- Helper functions

function bearerAuth(token: any) {
  return `Bearer ${token}`
}