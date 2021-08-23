export function getToken(){
  return window.sessionStorage.getItem('token')
}

export function setToken(token) {
  window.sessionStorage.setItem('token', token)
}

export function removeToken() {
  window.sessionStorage.removeItem('token')
}
