import { useState } from 'react'
import {
  emptyTodoFormValues,
  todoCreateBody,
} from '../schemas/todoForm'
import { useTodoForm } from '../hooks/useTodoForm'
import TodoFormFields from './TodoFormFields'
import Button from './ui/Button'

export default function AddTodoForm({ addTodo }) {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useTodoForm(emptyTodoFormValues)

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true)
    try {
      await addTodo(todoCreateBody(values))
      reset(emptyTodoFormValues)
    } catch {
      return
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="space-y-4">
        <TodoFormFields
          idPrefix="new"
          register={register}
          errors={errors}
          disabled={submitting}
          optionalDescriptionHint
        />
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add task'}
        </Button>
      </div>
    </form>
  )
}
