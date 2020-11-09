import React, { useEffect, useRef, useState } from 'react'
import './Input.scss'
interface Iprops {
  refElement?: any
  onChange?: (value: string | number) => void
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  value?: string | number | undefined
  children?: any
  className?: string
  id?: string
}
const InputElement = ({
  refElement,
  onChange,
  onFocus,
  onBlur,
  value,
  children,
  className,
  id,
}: Iprops) => {
  const ref = useRef(null)
  const handleChange = (e: any) => {
    refElement.current.changeValue(e.target.value)
    onChange && onChange(e.target.value)
  }
  const controlValue = (value: string | number) => {
    ref.current.value = value
  }

  if (refElement) {
    refElement.current.setValue = controlValue
  }
  return (
    <div className={`custom-input ${className}`}>
      <input
        type="text"
        ref={ref}
        onChange={handleChange}
        value={value}
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {children}
    </div>
  )
}
export default InputElement
