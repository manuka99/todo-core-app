import axios from 'axios'

export function apiErrorMessage(
  err,
  fallback = 'Request failed.'
) {
  if (axios.isAxiosError(err) && err.response?.data?.message) {
    return err.response.data.message
  }
  return fallback
}
