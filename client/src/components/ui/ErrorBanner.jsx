export default function ErrorBanner({ children }) {
  if (!children) return null
  return (
    <div
      className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
      role="alert"
    >
      {children}
    </div>
  )
}
