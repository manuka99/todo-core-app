import { z } from 'zod'

export const todoFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
})

export const emptyTodoFormValues = { title: '', description: '' }

export function todoCreateBody(values) {
  const title = values.title.trim()
  const d = (values.description ?? '').trim()
  return d ? { title, description: d } : { title }
}

export function todoUpdateBody(values) {
  return {
    title: values.title.trim(),
    description: (values.description ?? '').trim(),
  }
}
