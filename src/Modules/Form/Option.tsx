import React from 'react'
interface Iprops {
    value: string | number
    children: any
    search?: Array<string | number>
}
interface IValue {
  name: string
  key: any
  
}

const Option = ({
  value,
  children
}: Iprops) => {
  return (
    <option value={value}>{children}</option>
  )
}

export default Option
