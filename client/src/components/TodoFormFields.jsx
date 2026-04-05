import FieldError from './ui/FieldError'
import { fieldInputClass } from './ui/fieldClasses'

export default function TodoFormFields({
  idPrefix,
  register,
  errors,
  disabled = false,
  optionalDescriptionHint = false,
  labelVariant = 'default',
  textareaRows = 3,
}) {
  const titleId = `${idPrefix}-title`
  const descId = `${idPrefix}-description`
  const labelClass =
    labelVariant === 'sr-only'
      ? 'sr-only'
      : 'mb-1 block text-sm font-medium text-slate-700'

  return (
    <>
      <div>
        <label htmlFor={titleId} className={labelClass}>
          Title
        </label>
        <input
          id={titleId}
          type="text"
          {...register('title')}
          disabled={disabled}
          className={fieldInputClass}
        />
        <FieldError message={errors.title?.message} />
      </div>
      <div>
        <label htmlFor={descId} className={labelClass}>
          Description{' '}
          {optionalDescriptionHint ? (
            <span className="font-normal text-slate-500">(optional)</span>
          ) : null}
        </label>
        <textarea
          id={descId}
          rows={textareaRows}
          {...register('description')}
          disabled={disabled}
          className={fieldInputClass}
        />
        <FieldError message={errors.description?.message} />
      </div>
    </>
  )
}
