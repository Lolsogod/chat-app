import axios from 'axios'

export const chatApi = {
  getUserExtrasMe,
  saveUserExtrasMe,
  start,
  fetchUsers,
  messageHistory,
  availableChats,
  reserveChat,
  getChatInfo,
  redirectChat,
  closeChat
}

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
function start(token: any, name: String) {
  return instance.post(`/start`, {clientId: name} ,{
    headers: { 'Authorization': bearerAuth(token) }
  })
}
function fetchUsers(token: any, name: String) {
  return instance.get(`/userChats/${name}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function availableChats(token: any, name: String, role: String) {
  return instance.get(`/availableChats/${name}/${role}`,{
    headers: { 'Authorization': bearerAuth(token) }
  })
}
function messageHistory(token: any, chatId: String) {
  return instance.get(`/messages/${chatId}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function getChatInfo(token: any, chatId: String) {
  return instance.get(`/getChat/${chatId}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}


// резервы и другие приколы

function reserveChat(token: any, chatId: String, managerId: String) {
  return instance.post(`/reserveChat`, 
  {chatId,managerId} ,{
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function redirectChat(token: any, chatId: String, redirectManager: String) {
  return instance.post(`/redirectChat`, 
  {chatId,redirectManager} ,{
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function closeChat(token: any, chatId: String, managerId: String) {
  return instance.post(`/closeChat`, 
  {chatId,managerId} ,{
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