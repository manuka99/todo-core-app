import { useCallback, useEffect, useState } from 'react'
import { apiErrorMessage } from '../utils/apiError'
import {
  createTodo as apiCreateTodo,
  deleteTodo as apiDeleteTodo,
  getTodos,
  toggleDone as apiToggleDone,
  updateTodo as apiUpdateTodo,
} from '../services/todoApi'

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getTodos()
        if (!cancelled) setTodos(data)
      } catch (err) {
        if (!cancelled) setError(apiErrorMessage(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const addTodo = useCallback(async (data) => {
    const tempId = `temp-${Date.now()}`
    const optimistic = {
      _id: tempId,
      title: data.title,
      description: data.description ?? '',
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTodos((prev) => [optimistic, ...prev])
    try {
      const created = await apiCreateTodo(data)
      setTodos((prev) => prev.map((t) => (t._id === tempId ? created : t)))
      setError(null)
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t._id !== tempId))
      setError(apiErrorMessage(err))
      throw err
    }
  }, [])

  const editTodo = useCallback(async (id, data) => {
    let snapshot
    setTodos((prev) => {
      const t = prev.find((x) => x._id === id)
      if (!t) return prev
      snapshot = { ...t }
      return prev.map((x) =>
        x._id === id
          ? { ...x, title: data.title, description: data.description ?? '' }
          : x
      )
    })
    if (!snapshot) return
    try {
      const updated = await apiUpdateTodo(id, data)
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)))
      setError(null)
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === id ? snapshot : t)))
      setError(apiErrorMessage(err))
      throw err
    }
  }, [])

  const toggleTodo = useCallback(async (id) => {
    let snapshot
    setTodos((prev) => {
      const t = prev.find((x) => x._id === id)
      if (!t) return prev
      snapshot = { ...t }
      return prev.map((x) => (x._id === id ? { ...x, done: !x.done } : x))
    })
    if (!snapshot) return
    try {
      const updated = await apiToggleDone(id)
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)))
      setError(null)
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === id ? snapshot : t)))
      setError(apiErrorMessage(err))
      throw err
    }
  }, [])

  const removeTodo = useCallback(async (id) => {
    let removed
    let index = -1
    setTodos((prev) => {
      index = prev.findIndex((t) => t._id === id)
      if (index === -1) return prev
      removed = prev[index]
      return prev.filter((t) => t._id !== id)
    })
    if (!removed) return
    try {
      await apiDeleteTodo(id)
      setError(null)
    } catch (err) {
      setTodos((prev) => {
        const next = [...prev]
        next.splice(index, 0, removed)
        return next
      })
      setError(apiErrorMessage(err))
      throw err
    }
  }, [])

  return {
    todos,
    loading,
    error,
    addTodo,
    editTodo,
    toggleTodo,
    removeTodo,
  }
}
