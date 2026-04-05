const variants = {
  primary:
    'rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100',
  primarySm:
    'rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 active:scale-[0.98]',
  secondary:
    'rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 active:scale-[0.98]',
  ghost:
    'text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
  danger:
    'text-sm font-medium text-red-600 transition-colors duration-200 hover:text-red-500 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
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
