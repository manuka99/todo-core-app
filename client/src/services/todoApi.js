import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export function getTodos() {
  return api.get('/todos').then((r) => r.data)
}

export function createTodo(data) {
  return api.post('/todos', data).then((r) => r.data)
}

export function updateTodo(id, data) {
  return api.put(`/todos/${id}`, data).then((r) => r.data)
}

export function toggleDone(id) {
  return api.patch(`/todos/${id}/done`).then((r) => r.data)
}

export function deleteTodo(id) {
  return api.delete(`/todos/${id}`)
}
