import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Radio.scss'
interface IpropsRadioGroup {
  children?: any
  value?: string | number
  defaultValue?: string | number
  onChange?: (values: string | number) => void
  refElement?: any
  name: string
  isErrorValue?: boolean
}
interface IProps {
  onChange?: (checked: boolean) => void
  onChangeGroup?: (value: string | number) => void
  id?: string
  children?: any
  checked?: boolean
  defaultChecked?: boolean
  refElement?: any
  data: string
  value?: boolean
  className?: string
  disabled?: boolean
  name?: string
}

export const RadioGroup = ({
  children,
  value,
  defaultValue,
  onChange,
  refElement,
  name,
  isErrorValue,
}: IpropsRadioGroup) => {
  if (isErrorValue)
    console.error(
      'Warning: Please use the value or initialValue of FormItem. In some cases it will go wrong.',
    )
  const childrenNew: Array<any> = useMemo(
    () => (children.length > 0 ? (children.length != undefined ? children : [children]) : []),
    [children],
  )
  useEffect(() => {
    childrenNew.forEach(x => {
      if (x.type?.name != 'Radio') throw new Error('Only get the radio attribute')
      if (x.props?.checked || x.props?.defaultChecked)
        console.error(
          'Warning: Please use the value or initialValue of FormItem. In some cases it will go wrong.',
        )
    })
  }, [])
  const [data, setData] = useState<string | number>(value || defaultValue || '')

  const handleChangeValueToGroup = useCallback(value => {
    setData(value)
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
          defaultChecked: data == x.props.data,
          name: name,
        },
      }
      if (value) {
        childrenConvert['props']['checked'] = data == x.props.data ? true : false
      }
      return childrenConvert
    })
  }, [childrenNew, data])

  return <>{childrenShow}</>
}

const Radio = ({
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
  name,
}: IProps) => {
  const ref = useRef(null)
  const handleChange = useCallback((e: any) => {
    if (checked == undefined) {
      if (!disabled) {
        if (onChange) {
          onChange(e.target.value)
        }
        if (refElement) {
          refElement.current.changeValue(e.target.value)
        }
        onChangeGroup && onChangeGroup(e.target.value)
      }
    }
  }, [])
  const controlValue = (value: string) => {
    // if (typeof checked !== 'boolean') throw new Error('Error: Radio only accepts boolean value.')
    ref.current.checked = value == data
  }
  if (refElement) {
    refElement.current.setValue = controlValue
  }
  return (
    <div className={`radio ${className || ''} ${disabled ? 'radio-disabled' : ''}`}>
      <input
        className={`radio-input`}
        type="radio"
        name={name}
        value={data}
        id={id || data}
        onChange={handleChange}
        checked={checked}
        defaultChecked={defaultChecked}
        ref={ref}
        disabled={disabled}
      />
      <label htmlFor={id || data} className="radio-label">
        <span className="radio-label-inner"></span> {children}
      </label>
    </div>
  )
}
Radio.Group = RadioGroup
export default Radio
