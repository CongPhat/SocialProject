import { RcCustomRequestOptions } from 'antd/lib/upload/interface'
import React, { createContext, createRef, useEffect, useRef, useState } from 'react'
import FormItem from './FormItem'
interface Iprops {
  children: Array<any> | any
  onFinish: (value: IValues) => void
  onFinishFailed?: (values: IValues) => void
  form: any
}
interface IValues {
  [key: string]: string | number | null
}
interface IItemDraftChildren {
  element: any
  refCurrent: {
    current: IValueRequired
  }
}
interface IValueRequired {
  value: string | number
  error: boolean | null
  requiredError: (value: any) => void
  name: string
}
interface IFailed {
  value: any
  message: string
}

interface IValuesRequest {
  [key: string]: number | string | any
}

export const FormContext = createContext(null)

const FormElement = ({ children, onFinish, onFinishFailed, form }: Iprops) => {
  const handleSubmit = async () => {
    const { formItem } = form.refForm.current;    
    let formDraft = {...formItem};
    const keysFormItem = Object.keys(formItem)

    await Promise.all(keysFormItem.map(async (key: string) => {
      formDraft[key].requiredError(formDraft[key].value).catch(() => {
        formDraft[key] = {...formItem[key],error: false}})
    }));
    const valuesRequest: IValuesRequest = {}
    if (keysFormItem.every((keys: string) => formDraft[keys].error)) {
      keysFormItem.forEach(x => {
        valuesRequest[x] = formDraft[x].value
      })
      onFinish(valuesRequest)
    } else {
      keysFormItem.forEach((keys: string) => {
        const { error } = formDraft[keys]
        if (!error) {
          valuesRequest[keys] = formDraft[keys].value
        }
      })
      onFinishFailed && onFinishFailed(valuesRequest)
    }
  }
  return (
    <FormContext.Provider value={form}>
      {children}
      <button type="button" onClick={handleSubmit}>
        Test
      </button>
    </FormContext.Provider>
  )
}
export default FormElement
