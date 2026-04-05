import { useState } from 'react'
import { todoUpdateBody } from '../schemas/todoForm'
import { useTodoForm } from '../hooks/useTodoForm'
import TodoFormFields from './TodoFormFields'
import Button from './ui/Button'

export default function TodoItem({ todo, toggleTodo, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const pending = String(todo._id).startsWith('temp-')
  const formId = String(todo._id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useTodoForm({
    title: todo.title,
    description: todo.description ?? '',
  })

  function openEdit() {
    reset({ title: todo.title, description: todo.description ?? '' })
    setIsEditing(true)
  }

  function cancelEdit() {
    reset({ title: todo.title, description: todo.description ?? '' })
    setIsEditing(false)
  }

  const onSave = handleSubmit(async (values) => {
    try {
      await editTodo(todo._id, todoUpdateBody(values))
      setIsEditing(false)
    } catch {
      return
    }
  })

  return (
    <li
      className={`flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-opacity duration-300 animate-fade-in ${
        todo.done ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <input
        type="checkbox"
        checked={!!todo.done}
        disabled={pending}
        onChange={() => toggleTodo(todo._id)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 transition-colors duration-200 focus:ring-slate-500 disabled:cursor-not-allowed"
        aria-label={todo.done ? 'Mark incomplete' : 'Mark complete'}
      />
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <form onSubmit={onSave} className="space-y-3">
            <TodoFormFields
              idPrefix={`edit-${formId}`}
              register={register}
              errors={errors}
              labelVariant="sr-only"
              textareaRows={2}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" variant="primarySm">
                Save
              </Button>
              <Button type="button" variant="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <h2
              className={`font-medium text-slate-900 transition-all duration-200 ${
                todo.done ? 'line-through' : ''
              }`}
            >
              {todo.title}
            </h2>
            {todo.description ? (
              <p
                className={`mt-1 text-sm text-slate-600 transition-all duration-200 ${
                  todo.done ? 'line-through' : ''
                }`}
              >
                {todo.description}
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="ghost" disabled={pending} onClick={openEdit}>
                Edit
              </Button>
              <Button variant="danger" disabled={pending} onClick={() => removeTodo(todo._id)}>
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </li>
  )
}
