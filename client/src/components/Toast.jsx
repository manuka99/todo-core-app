import { useEffect } from 'react'

export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return undefined
    const id = window.setTimeout(() => onDismiss(), 3000)
    return () => window.clearTimeout(id)
  }, [message, onDismiss])

  if (!message) return null

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-50 max-w-sm px-4 sm:px-0"
      aria-live="polite"
    >
      <div
        className="pointer-events-auto rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 shadow-lg transition-opacity duration-300"
        role="alert"
      >
        {message}
      </div>
    </div>
  )
}
