import { useTodos } from '../hooks/useTodos'
import AddTodoForm from './AddTodoForm'
import EmptyTodoState from './EmptyTodoState'
import TodoItem from './TodoItem'
import Toast from './Toast'
import Spinner from './ui/Spinner'

export default function TodoList() {
  const {
    todos,
    loading,
    error,
    clearError,
    initialLoadFailed,
    addTodo,
    editTodo,
    toggleTodo,
    removeTodo,
  } = useTodos()

  return (
    <div>
      <Toast message={error} onDismiss={clearError} />

      <AddTodoForm addTodo={addTodo} />

      {loading ? (
        <Spinner />
      ) : todos.length > 0 ? (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
      ) : initialLoadFailed ? (
        <p className="rounded-lg border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-600 shadow-sm">
          Unable to load tasks. Reload the page.
        </p>
      ) : (
        <EmptyTodoState />
      )}
    </div>
  )
}
