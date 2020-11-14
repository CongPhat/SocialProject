import React from 'react'
interface Iprops {
  value: string | number
  children: any
  search?: Array<string | number>
  disabled?: boolean
}
interface IValue {
  name: string
  key: any
}

const Option = ({ value, children, disabled }: Iprops) => {
  return <option value={value}>{children}</option>
}

export default Option
