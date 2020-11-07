import React, { useRef } from 'react'
import { IValueRequired } from './FormItem'
interface IRefFormItem {
  [key: string]: any
}
interface IArrayKey {}
const ItemRef: IRefFormItem = {}
const useForm = () => {
  const refForm = useRef({
    formItem: ItemRef,
  })
  const getFieldsValue = (arrKey: Array<string>) => {
    const valuesRequest: IRefFormItem = {}
    if (refForm.current) {
      arrKey.forEach(x => {
        valuesRequest[x] = refForm.current.formItem[x]?.value || ''
      })
    }
    return valuesRequest
  }
  const setFieldsValue = (values: any) => {
    Object.keys(values).forEach((xKey: string) => {
      refForm.current.formItem[xKey].setValue(values[xKey])
      refForm.current.formItem[xKey].requiredError(values[xKey])
    })
  }
  return {
    refForm,
    getFieldsValue,
    setFieldsValue,
  }
}
export default useForm
