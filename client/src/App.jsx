import TodoList from './components/TodoList'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">TODO</h1>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-8">
        <TodoList />
      </main>
    </div>
  )
}

export default App
