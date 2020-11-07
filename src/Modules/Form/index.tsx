import { message } from 'antd'
import useForm from './useForm'
import React, { useEffect, useState } from 'react'
import FormElement from './FormElement'
import FormItem from './FormItem'
import InputElement from './Input'
import SelectElement from './Select'
import Option from './Option'

// const { Select, Option } = SelectElement

const selectTest = [
  { key: '1', name: 'CongPhat', text: 'abc' },
  { key: '2', name: 'CongPhat1234', text: 'bbbbb' },
  { key: '3', name: 'CongPhat123455', text: 'bbbb' },
  { key: '4', name: 'CongPhat1234555',text: 'ccc' },
  { key: '5', name: 'CongPhat12346',text: 'ddd' },
  { key: '6', name: 'CongPhat123466',text: 'eeee' },
  { key: '7', name: 'COnglam',text: 'ffff' },
  { key: '8', name: 'CongPhat1234412',text: 'gggg' },
  { key: '9', name: 'CongPhat12343',text: 'hhhh' },
  { key: '10', name: 'CongPhat12341235',text: 'llll' },
  { key: '12', name: 'CongPhat1234123',text: 'bbbb' },
  { key: '11', name: 'CongPhat123455',text: '11111' },
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
    form.setFieldsValue({
      'test2': 1444
    })
    setTestSelect([...selectTest])
  }, [])
  console.log(testSelect);
  
  const handleChangSelect = (values) => {
    
  }
  return (
    <>
      <FormElement onFinish={handleFinish} form={form} onFinishFailed={handleFailed}>
        <div>
          <div>
            <FormItem
              key={'item1'}
              name={'test1'}
              rules={[
                {
                  message: 'Required123123',
                  required: true,
                },
                // {
                //   message: 'Test',
                //   required: true,
                //   handle: (value, allValue) => {
                //     return parseInt(value) > parseInt(form.getFieldsValue(['test2']).test2)
                //   },
                // },
              ]}
              initialValue={'112312312321313'}
              label="Username"
              value={test}
            >
              <>
                {/* <input type="text" name="" id="" /> */}
                <InputElement onChange={handleChange} className="1234" onFocus={handleFocus} />
              </>
            </FormItem>
            <FormItem
              key={'item2'}
              name={'test2'}
              label="Gioi tinh"
              // initialValue={['144', '2444']}
              // value={1}
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
              <SelectElement multiple remove placeholder='Please select' onChange={handleChangSelect}> 
                {testSelect.map((item, index) =>  
                  <Option value={item.key} key={index} search={[item.name, item.text]}>
                    <div>
                      <div>
                        {item.name}
                      </div>
                    </div>
                  </Option>
                )}
              </SelectElement>
             
            </FormItem>
          </div>
        </div>

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

    </>
  )
}
export default Form
