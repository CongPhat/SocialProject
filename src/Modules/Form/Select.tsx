import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Select.scss'
interface Iprops {
  element?: Array<any>
  refElement?: any
  onChange?: (values: any) => void
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  value?: string | number | Array<string | number>
  children?: any
  className?: string
  id?: string
  multiple?: boolean
  remove?: boolean
  placeholder?: string
  defaultValue?: string | number | Array<string | number>
}

interface IElement {
  key: string | number
  name: any
  fillSearch: string
}

interface IStateSelect {
  status: boolean
  allData: Array<IElement>
  current: Array<IElement>
  default: boolean
}

const useOutsideAlerter = (ref: any, focusRef: any, status: boolean, data: any) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target) && !status) {
        focusRef.current.clickOutSide && focusRef.current.clickOutSide(data)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, focusRef, data])
}

interface iOutsideAlerter {
  clickOutSide: (data: any) => void
  children: any
  status: boolean
  data: any
}
const OutsideAlerter = (props: iOutsideAlerter) => {
  const wrapperRef = useRef(null)
  const focusRef = useRef({
    clickOutSide: props.clickOutSide || null,
  })
  useOutsideAlerter(wrapperRef, focusRef, props.status, props.data)

  return <div ref={wrapperRef}>{props.children}</div>
}
const MemoOutside = OutsideAlerter

const SelectElement = ({
  refElement,
  onChange,
  onFocus,
  onBlur,
  value,
  children,
  className,
  id,
  multiple,
  remove,
  placeholder,
  defaultValue,
}: Iprops) => {
  const dataStructure = useMemo(
    () => ({
      key: 0,
      name: '',
      fillSearch: '',
    }),
    [],
  )
  const childrenNew: Array<any> = useMemo(
    () => (children.length > 0 ? (children.length != undefined ? children : [children]) : []),
    [children],
  )
  const element = useMemo(
    () =>
      childrenNew.map(x => {
        if (x.type?.name != 'Option') throw new Error('Only get the option attribute')
        return {
          key: x.props.value,
          name: x.props.children,
          fillSearch: x.props.search
            ? x.props.search.reduce((string: string, y: string | number) => `${string} ${y}`, ``)
            : x.props.children,
        }
      }),
    [childrenNew],
  )

  const refInput = useRef(null)
  const refSelectionItem = useRef(null)
  const refPlaceholder = useRef(null)

  const customValue: any = useCallback(
    (values: string | number | Array<string | number>, allAdata: Array<IElement>) => {
      if (Array.isArray(values)) {
        const dataUpdate: Array<IElement> = values.map(value => {
          return allAdata.find(x => x.key == value) || { ...dataStructure, key: value, name: value }
        })
        return dataUpdate
      }
      return [
        allAdata.find(x => x.key == values) || { ...dataStructure, key: values, name: values },
      ]
    },
    [],
  )

  const [dropdown, setDropdown] = useState<IStateSelect>({
    status: null,
    allData: element || [],
    current:
      value !== undefined
        ? customValue(value, element)
        : defaultValue != undefined
        ? customValue(defaultValue, element)
        : [],
    default: false,
  })

  useEffect(() => {
    setDropdown(pre => {
      const currentUpdate = pre.current.map(x => element.find(y => x.key == y.key) || x)
      return { ...pre, allData: element, current: currentUpdate }
    })
  }, [element])

  const handleClickSelect = useCallback(() => {
    multiple && refInput.current.focus()
    setDropdown(pre => (pre.status ? pre : { ...pre, status: true }))
  }, [])
  const handleSelectItem = useCallback(
    (item: IElement) => {
      if (multiple) {
        refInput.current.focus()
        const itemFind: any = dropdown.current.find(x => x.key == item.key)
        setDropdown(pre => ({
          ...pre,
          allData: element,
          current: itemFind ? pre.current.filter(y => y.key != item.key) : [...pre.current, item],
          default: true,
        }))
      } else {
        setDropdown(pre => ({ ...pre, status: !pre.status, current: [item], default: true }))
      }
    },
    [dropdown.current, element],
  )
  const handleRemoveItemMultiple = useCallback(
    (item: IElement) => {
      setDropdown(pre => ({
        ...pre,
        allData: element,
        current: pre.current.filter(y => y.key != item.key),
        default: true,
      }))
    },
    [element],
  )
  const handleFocusInput = useCallback(e => {
    !multiple && refSelectionItem.current.classList.add('item-show', 'item-focused')
  }, [])
  const handleBlurInput = useCallback(e => {
    refInput.current.value = ''
    !multiple && refSelectionItem.current.classList.remove('item-focused', 'item-hidden')
  }, [])
  const handleChangeInput = useCallback(
    e => {
      if (!multiple)
        e.target.value !== ''
          ? refSelectionItem.current.classList.add('item-hidden')
          : refSelectionItem.current.classList.remove('item-hidden')
      const arrNew = element.filter(
        x =>
          String(x.fillSearch)
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) != -1,
      )
      if (arrNew.length !== dropdown.allData.length)
        setDropdown(pre => ({ ...pre, allData: arrNew }))

      //placeholder
      if (placeholder && dropdown.current.length === 0) {
        e.target.value !== ''
          ? refPlaceholder.current.classList.add('item-hidden')
          : refPlaceholder.current.classList.remove('item-hidden')
      }
    },
    [dropdown],
  )
  const handleKeyDown = useCallback(
    e => {
      if (multiple && e.keyCode == 8 && e.target.value == '') {
        setDropdown(pre =>
          pre.current.length == 0
            ? pre
            : { ...pre, allData: element, current: pre.current.slice(0, pre.current.length - 1) },
        )
      }
    },
    [element],
  )
  const handleClickOutSide = useCallback(
    (data: any) => {
      setDropdown(pre => {
        return pre.status == false ? pre : { ...pre, status: false, allData: data }
      })
    },
    [dropdown, element],
  )
  const handleRemoveAllCurrent = useCallback(() => {
    setDropdown(pre =>
      pre.current.length == 0 ? pre : { ...pre, allData: element, current: [], default: true },
    )
  }, [element])

  useEffect(() => {
    if (dropdown.default) {
      const dataReceive = multiple
        ? dropdown.current.map(x => x.key)
        : dropdown.current[0]
        ? dropdown.current[0].key
        : undefined
      if (refElement) {
        refElement.current.changeValue(dataReceive || '')
      }
      if (onChange) {
        onChange(dataReceive)
      }
    }
  }, [dropdown.current, dropdown.default])

  const controlValue = useCallback(
    (values: string | number | Array<any>) => {
      if (Array.isArray(values)) {
        const dataUpdate = values.map(value => {
          return (
            dropdown.allData.find(x => x.key == value) || {
              ...dataStructure,
              key: value,
              name: value,
            }
          )
        })
        setDropdown(pre => ({ ...pre, allData: element, current: dataUpdate }))
      } else {
        const itemFindAll: any = dropdown.allData.find(x => x.key == values) || {
          ...dataStructure,
          key: values,
          name: values,
        }
        setDropdown(pre => ({ ...pre, allData: element, current: [itemFindAll] }))
      }
    },
    [dropdown.current],
  )

  if (refElement) {
    refElement.current.setValue = controlValue
  }

  return (
    <MemoOutside clickOutSide={handleClickOutSide} status={dropdown.status} data={element}>
      <div className={`select ${className}`} id={id || ''}>
        <div className={`select-wrapper`}>
          <div className={`select-selector ${multiple && 'select-selector-multiple'}`}>
            <div
              className="select-selection"
              onClick={handleClickSelect}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              {multiple &&
                dropdown.current.map((item, index) => (
                  <span key={index} className={`select-selection-multiple`}>
                    {item?.name}
                    <span
                      className="select-selection-multiple-remove"
                      onClick={() => handleRemoveItemMultiple(item)}
                    >
                      x
                    </span>
                  </span>
                ))}
              {multiple && (
                <span className={`select-selection-search`}>
                  <input
                    type="text"
                    ref={refInput}
                    onFocus={handleFocusInput}
                    onBlur={handleBlurInput}
                    onChange={handleChangeInput}
                    onKeyDown={handleKeyDown}
                  />
                </span>
              )}
              {!multiple && (
                <span className={`select-selection-item`} ref={refSelectionItem}>
                  {dropdown.current[0]?.name}
                </span>
              )}
              {placeholder && dropdown.current.length == 0 && (
                <span className={`select-selection-placeholder`} ref={refPlaceholder}>
                  {placeholder || ''}
                </span>
              )}
            </div>
            {remove && (
              <span className={`select-selection-remove`} onClick={handleRemoveAllCurrent}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            )}
          </div>
        </div>
        <div
          className={`select-dropdown ${
            !dropdown.status ? 'select-dropdown-hidden' : 'select-dropdown-active'
          }`}
        >
          <ul className={`select-dropdown-block`}>
            {dropdown.allData.length == 0
              ? 'Nodata'
              : dropdown.allData.map((item: IElement, index: number) => (
                  <li
                    key={index}
                    className={`select-dropdown-block-item ${dropdown.current.find(
                      x => x.key == item.key,
                    ) && 'select-dropdown-block-item-selected'}`}
                    onClick={() => value == undefined && handleSelectItem(item)}
                  >
                    {item?.name || ''}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </MemoOutside>
  )
}

export default SelectElement
