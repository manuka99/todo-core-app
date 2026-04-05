import axios from 'axios'

export function apiErrorMessage(
  err,
  fallback = 'Something went wrong. Please try again.'
) {
  if (axios.isAxiosError(err) && err.response?.data?.message) {
    return err.response.data.message
  }
  return fallback
}
