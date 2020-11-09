import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
interface IpropsCheckboxGroup {
  children?: any
  value?: Array<string | number>
  defaultValue?: Array<string | number>
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
}

export const CheckboxGroup = ({ children, value, defaultValue }: IpropsCheckboxGroup) => {
  const childrenNew: Array<any> = useMemo(
    () => (children.length > 0 ? (children.length != undefined ? children : [children]) : []),
    [children],
  )
  console.log(childrenNew)

  useEffect(() => {
    childrenNew.forEach(x => {
      if (x.type?.name != 'Checkbox') throw new Error('Only get the checkbox attribute')
      if (x.props?.checked || x.props?.defaultChecked)
        console.error(
          'Warning: Please use the value or initialValue of FormItem. In some cases it will go wrong.',
        )
    })
  }, [])

  //   const element = useMemo(
  //     () =>
  //     childrenNew.filter(y => y.props.)childrenNew.map(x => {
  //         return x.props.value
  //       }),
  //     [childrenNew],
  //   )
  const [data, setData] = useState<Array<string | number>>(value || defaultValue || [])

  const handleChangeValueToGroup = useCallback((checked, value) => {
    console.log(checked, value, 'itemitemitemitemitemitem')
  }, [])
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
          checked: value || data.find(y => y == x.props.data),
        },
      }
      if (value) {
        childrenConvert['checked'] = data.find(y => y == x.props.data)
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
}: IProps) => {
  console.log(checked, 'checkedcheckedcheckedchecked')

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
    <div className={`checkbox ${className}`}>
      <input
        type="checkbox"
        name=""
        value={data}
        id={id}
        onChange={handleChange}
        checked={checked}
        defaultChecked={defaultChecked}
        ref={ref}
      />
      {children}
    </div>
  )
}
export default Checkbox
