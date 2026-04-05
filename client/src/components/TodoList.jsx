import { useTodos } from '../hooks/useTodos'
import AddTodoForm from './AddTodoForm'
import TodoItem from './TodoItem'
import ErrorBanner from './ui/ErrorBanner'
import Spinner from './ui/Spinner'

export default function TodoList() {
  const { todos, loading, error, addTodo, editTodo, toggleTodo, removeTodo } = useTodos()

  return (
    <div>
      <AddTodoForm addTodo={addTodo} />

      <ErrorBanner>{error}</ErrorBanner>

      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  )
}
