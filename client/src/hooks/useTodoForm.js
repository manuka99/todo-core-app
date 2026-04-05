import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { todoFormSchema } from '../schemas/todoForm'

export function useTodoForm(defaultValues) {
  return useForm({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
  })
}
