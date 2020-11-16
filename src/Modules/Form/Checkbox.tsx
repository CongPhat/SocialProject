import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Checkbox.scss'
interface IpropsCheckboxGroup {
  children?: any
  value?: Array<string | number>
  defaultValue?: Array<string | number>
  onChange?: (values: Array<string | number>) => void
  refElement?: any
}
interface IProps {
  onChange?: (checked: boolean) => void
  onChangeGroup?: (checked: boolean, value: string | number) => void
  id?: string
  children?: any
  checked?: boolean
  defaultChecked?: boolean
  refElement?: any
  data: string
  value?: boolean
  className?: string
  disabled?: boolean
}

export const CheckboxGroup = ({
  children,
  value,
  defaultValue,
  onChange,
  refElement,
}: IpropsCheckboxGroup) => {
  const childrenNew: Array<any> = useMemo(
    () => (children.length > 0 ? (children.length != undefined ? children : [children]) : []),
    [children],
  )
  useEffect(() => {
    childrenNew.forEach(x => {
      if (x.type?.name != 'Checkbox') throw new Error('Only get the checkbox attribute')
      if (x.props?.checked || x.props?.defaultChecked)
        console.error(
          'Warning: Please use the value or initialValue of FormItem. In some cases it will go wrong.',
        )
    })
  }, [])
  const [data, setData] = useState<Array<string | number>>(value || defaultValue || [])

  const handleChangeValueToGroup = useCallback((checked, value) => {
    setData(pre => (checked ? [...pre, value] : pre.filter(x => x != value)))
  }, [])
  useEffect(() => {
    if (onChange) {
      onChange(data)
    }
    if (refElement) {
      refElement.current.changeValue(data)
    }
  }, [data])
  useEffect(() => {
    if (value) setData(value)
  }, [value])
  const childrenShow = useMemo(() => {
    return childrenNew.map(x => {
      let childrenConvert = {
        ...x,
        props: {
          ...x.props,
          onChangeGroup: handleChangeValueToGroup,
          defaultChecked: data.find(y => y == x.props.data),
        },
      }
      if (value) {
        childrenConvert['props']['checked'] = data.find(y => y == x.props.data) ? true : false
      }
      return childrenConvert
    })
  }, [childrenNew, data])

  return <>{childrenShow}</>
}

const Checkbox = ({
  id,
  onChange,
  children,
  onChangeGroup,
  checked,
  defaultChecked,
  refElement,
  data,
  className,
  disabled,
}: IProps) => {
  const ref = useRef(null)
  const handleChange = useCallback((e: any) => {
    if (checked == undefined) {
      if (onChange) {
        onChange(e.target.checked)
      }
      if (refElement) {
        refElement.current.changeValue(e.target.checked)
      }
      onChangeGroup && onChangeGroup(e.target.checked, e.target.value)
    }
  }, [])
  const controlValue = (checked: boolean) => {
    if (typeof checked !== 'boolean') throw new Error('Error: Checkbox only accepts boolean value.')
    ref.current.checked = checked
  }
  if (refElement) {
    refElement.current.setValue = controlValue
  }
  return (
    <div className={`checkbox ${className || ''} ${disabled ? 'checkbox-disabled' : ''}`}>
      <input
        className={`checkbox-input`}
        type="checkbox"
        name=""
        value={data}
        id={id || data}
        onChange={handleChange}
        checked={checked}
        defaultChecked={defaultChecked}
        ref={ref}
        disabled={disabled}
      />
      <label htmlFor={id || data} className="checkbox-label">
        <span className="checkbox-label-inner"></span> {children}
      </label>
    </div>
  )
}
Checkbox.Group = CheckboxGroup
export default Checkbox
