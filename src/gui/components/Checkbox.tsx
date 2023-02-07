import React from 'react'

interface CheckboxProps {
  id: string
  label: string | JSX.Element
  value: boolean
  onChange: (event: any) => void
}

const Checkbox = ({
  id,
  label,
  value,
  onChange,
}: CheckboxProps): React.ReactElement => {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={() => {
          onChange(!value)
        }}
      />
      <label className="ms-1" htmlFor={id} aria-describedby="label">
        {label}
      </label>
    </>
  )
}

export default Checkbox
