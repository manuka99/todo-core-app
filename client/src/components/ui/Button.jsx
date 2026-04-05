const variants = {
  primary:
    'rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60',
  primarySm:
    'rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800',
  secondary:
    'rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50',
  ghost:
    'text-sm font-medium text-slate-700 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50',
  danger:
    'text-sm font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50',
}

export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const base = variants[variant] ?? variants.primary
  return <button type={type} className={[base, className].filter(Boolean).join(' ')} {...props} />
}
