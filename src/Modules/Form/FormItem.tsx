import { FormContext } from './FormElement'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import InputElement from './Input'
import styled from 'styled-components'
import './FormItem.scss'
import { AllElement, AllElementDefault } from './Variables'
interface Iprops {
  children: any
  name: string
  rules?: Array<{
    required: boolean
    message: string
    handle?: (value: any, allData: any) => boolean
  }>
  refFormItem?: any
  initialValue?: any
  value?: any
  label?: string
}
export interface IValueRequired {
  value: string | number
  error: boolean | null
  requiredError: (value: any) => Promise<any>
  setValue: (value: any) => void
  name: string
}
export interface IValuesRefElement {
  changeValue: (value: any) => void
  setValue(value: any): null | Promise<any>
  value?: any
}
interface IData {
  [key: string]: string
}

// const SpanError = styled.span`
//   color: red;
// `

const FormItem = ({ children, rules, refFormItem, name, initialValue, value, label }: Iprops) => {

  const refChildren = useRef(null)
  const refError = useRef(null)
  const valuesRefElement: IValuesRefElement = {
    changeValue: (valueChange: any) => handleElementChangeValue(valueChange),
    setValue: null,
  }
  const refElement = useRef(valuesRefElement)
  const { refForm } = useContext(FormContext)
  const [errorMessage, setErrorMessage] = useState({
    error: null,
    message: '',
  })
  
  const fillError = (status: boolean, message?: string) => {        
    setErrorMessage(pre => {
      if (status != pre.error || message != pre.message) {
        return {...pre,
          error: status,
          message: message || '',
        }
      }
      return pre
    })
  }

  const valueRequired: IValueRequired = {
    value: '',
    error: null,
    requiredError: (value?: any): Promise<any> => {
      return new Promise((rel, rej) => {
        if (rules) {
          const dataReceiveConvert:IData = {};
          Object.keys(refForm.current.formItem).map(key => {
            dataReceiveConvert[key] = refForm.current.formItem[key].value
          })
          const ruleFind = rules.find(x => (x.required && x.handle && x.handle(value, dataReceiveConvert)) || value == '')          
          if(ruleFind) {
            rej('Error')
            fillError(false, ruleFind.message)
          } else {
            rel()
            fillError(true)
          }
         }
        }
      )
    },
    setValue: (value: any) => {      
      if (refChildren.current) {
        refChildren.current.value = value
      }
      if (refElement.current.setValue) {
        refElement.current.setValue(value)
      }
    },
    name: name,
  }
  useEffect(() => {
    refForm.current.formItem = {
      ...refForm.current.formItem,
      [name]: { ...valueRequired },
    }
    if (initialValue) {      
      refForm.current.formItem[name]?.setValue(initialValue)
      refForm.current.formItem[name].requiredError(initialValue).then(() => {
        setValueFieldRef(initialValue, true)
      }).catch(() => {
        setValueFieldRef(initialValue, false)
      })
    } else {
      refForm.current.formItem[name].requiredError(null)
    }
  }, [])

  useEffect(() => {    
    if (value) {
      refForm.current.formItem[name]?.setValue(value)
      handleElementChangeValue(value)
    }
  }, [value])

  useEffect(() => {
    if (refError.current) {
      refError.current.innerText = errorMessage.message
    }
  }, [errorMessage])

  const handleElementChangeValue = (valueChange: any) => {    
      refForm.current.formItem[name]?.requiredError(valueChange).then(() => {
        setValueFieldRef(valueChange, true)
      }).catch(() => {
        setValueFieldRef(valueChange, false)
      })
      
  }
  const propsError = useMemo(() => {
    return React.createElement('span', { ref: refError, className: 'error-message' })
  }, [value])

  const propsElement = useCallback(
    (item: any) => {      
      return {
        ...item,
        props: {
          ...item.props,
          refElement,
          value: value,
          id: name,
        },
      }
    },
    [value],
  )

  const createLabel = useCallback(() => {
    return React.createElement('label', {
      for: name,
      children: label,
      className: `form-item-wrapper-label ${rules && 'label-required'}`,
    })
  }, [])
  const createAllFormItem = useCallback((ElementCurrent: any) => {
    return <div className="form-item-wrapper">
            {label && createLabel()}
            {ElementCurrent}
            {propsError}
          </div>
  },[])

  const propsChildren = useMemo(() => {
    return {
      ref: refChildren,
      onChange: (e: any) => {
        if (value) return
        return handleElementChangeValue(e.target.value)
      },
      id: name,
      value: value,
    }
  }, [value])

  const handleNode = (arr: Array<any>) => {
    const customReactNode: any = React.Children.map(arr, (item, idx) => {
      if (AllElementDefault.find(x => item.type == x)) {
        return createAllFormItem(React.cloneElement(item, propsChildren))
      } else if (typeof item.type != 'string' && AllElement.find(x => item.type.name == x)) {
        return createAllFormItem(propsElement(item))
      } else {
        if (item.props.children && typeof item.props.children != 'string') {
          return React.cloneElement(item, { children: handleNode(item.props.children) })
        }
      }
      return React.cloneElement(item)
    })
    return customReactNode
  }

  const childrenNew = useMemo(() => {
    return (AllElementDefault.find(x => children.type == x)) ? (
      createAllFormItem(React.cloneElement(children, propsChildren))
    ) : typeof children.type != 'string' && AllElement.find(x => children.type.name == x) ? (
      createAllFormItem(propsElement(children))
    ) : (
      handleNode(children.props.children)
    )
  }, [children])

  const setValueFieldRef = (value: string, statusError: boolean) => {
    refForm.current.formItem = {
      ...refForm.current.formItem,
      [name]: {
        ...refForm.current.formItem[name],
        value: value,
        error: statusError,
        name: name,
      },
    }
  }

  return <div className="form-item">{childrenNew}</div>
}
export default FormItem
