import { message } from 'antd'
import useForm from './useForm'
import React, { useEffect, useState } from 'react'
import FormElement from './FormElement'
import FormItem from './FormItem'
import InputElement from './Input'
import Select from './Select'
import Option from './Option'
import Checkbox from './Checkbox'
import { CheckboxGroup } from './Checkbox'
import Empty from './Empty'

// const { Select, Option } = SelectElement

const selectTest = [
  { key: '1', name: 'CongPhat', text: 'abc' },
  { key: '2', name: 'CongPhat1234', text: 'bbbbb' },
  { key: '3', name: 'CongPhat123455', text: 'bbbb' },
  { key: '4', name: 'CongPhat1234555', text: 'ccc' },
  { key: '5', name: 'CongPhat12346', text: 'ddd' },
  { key: '6', name: 'CongPhat123466', text: 'eeee' },
  { key: '7', name: 'COnglam', text: 'ffff' },
  { key: '8', name: 'CongPhat1234412', text: 'gggg' },
  { key: '9', name: 'CongPhat12343', text: 'hhhh' },
  { key: '10', name: 'CongPhat12341235', text: 'llll' },
  { key: '12', name: 'CongPhat1234123', text: 'bbbb' },
  { key: '11', name: 'CongPhat123455', text: '11111' },
]
const Form = () => {
  const form = useForm()
  useEffect(() => {
    // form.setFieldsValue({
    //   test2: '55',
    // })
  }, [])
  const handleFinish = value => {
    console.log(value, 'finish')
  }
  const handleFailed = value => {
    console.log(value, 'failed')
  }

  const handleChange = value => {
    // console.log(value, 'valuevaluevalue')
  }
  const handleFocus = e => {
    console.log(e)
  }

  const [test, setTest] = useState(5)
  const [testSelect, setTestSelect] = useState([])

  useEffect(() => {
    // form.setFieldsValue({
    //   'test2': 1
    // })
    setTimeout(() => {
      setTest(1)
    }, 3000)

    setTestSelect([...selectTest])
  }, [])
  console.log(testSelect)

  const handleChangSelect = values => {
    console.log('change change')
  }
  return (
    <>
      <Empty />
      <FormElement onFinish={handleFinish} form={form} onFinishFailed={handleFailed}>
        <div>
          <div>
            <FormItem
              key={'item2'}
              name={'test2'}
              label="Gioi tinh"
              // value={test}
              rules={[
                {
                  message: 'Required',
                  required: true,
                },
                // {
                //   message: 'Test111',
                //   required: true,
                //   handle: value => {
                //     return false
                //   },
                // },
              ]}
            >
              <Select
                placeholder="Please select"
                onChange={handleChangSelect}
                onFocus={e => console.log(e)}
                loading={false}
                remove
              >
                {testSelect.map((item, index) => (
                  <Option
                    value={item.key}
                    key={index}
                    search={[item.name, item.text]}
                    disabled={index == 2}
                  >
                    <div>
                      <div>{item.name}</div>
                    </div>
                  </Option>
                ))}
              </Select>
            </FormItem>
          </div>
        </div>
        <FormItem
          key={'item3'}
          name={'test3'}
          label="Checkbox"
          initialValue={false}
          value={true}
          valuesProps={'checked'}
          rules={
            [
              // {
              //   message: 'Required',
              //   required: true,
              // },
              // {
              //   message: 'Test111',
              //   required: true,
              //   handle: value => {
              //     return false
              //   },
              // },
            ]
          }
        >
          <Checkbox data="test">Test1234</Checkbox>
        </FormItem>
        <FormItem
          key={'item4'}
          name={'test4'}
          label="CheckboxGroup"
          initialValue={['1234']}
          // value={[234]}
          // valuesProps={'checked'}
          rules={
            [
              // {
              //   message: 'Required',
              //   required: true,
              // },
              // {
              //   message: 'Test111',
              //   required: true,
              //   handle: value => {
              //     return false
              //   },
              // },
            ]
          }
        >
          <CheckboxGroup>
            <Checkbox data="1234">Test</Checkbox>
            <Checkbox data="12345">Test124</Checkbox>
          </CheckboxGroup>
        </FormItem>

        <div>
          {/* <FormItem
            key={'item7'}
            name={'test7'}
            rules={[
              {
                message: 'Required123123',
                required: true,
              },
            ]}
          >
            <InputElement />
          </FormItem> */}
        </div>

        {/* <FormItem
          key={'item3'}
          name={'test3'}
          rules={[
            {
              message: 'Required',
              required: true,
            },
          ]}
        >
          <InputElement />
        </FormItem> */}
      </FormElement>
      <Select
        placeholder="Please select"
        onChange={handleChangSelect}
        onFocus={e => console.log(e)}
        defaultValue={3}
        multiple
      >
        {testSelect.map((item, index) => (
          <Option
            value={item.key}
            key={index}
            search={[item.name, item.text]}
            disabled={index == 2}
          >
            <div>
              <div>{item.name}</div>
            </div>
          </Option>
        ))}
      </Select>
      <Select
        placeholder="Please select"
        onChange={handleChangSelect}
        onFocus={e => console.log(e)}
        defaultValue={1}
      >
        {testSelect.map((item, index) => (
          <Option value={item.key} key={index} search={[item.name, item.text]}>
            <div>
              <div>{item.name}</div>
            </div>
          </Option>
        ))}
      </Select>
    </>
  )
}
export default Form
