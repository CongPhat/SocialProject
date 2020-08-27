import React from 'react'
import LoadingSearchComponent from '@Common/LoadingSearchComponent'
import './style.scss'
interface Iprops {
  type?: string
  text: string
  onClick?: (event: any) => void
  className?: string
  typeColor?: 'blue'
  loading?: boolean
}

const ButtonComponent = (props: Iprops) => {
  console.log(props.loading, 'asdassad')

  return (
    <>
      <button
        type={'button'}
        onClick={event =>
          (props.loading === false || props.loading === undefined) &&
          (props.onClick ? props.onClick(event) : undefined)
        }
        className={`${
          props.className
        } buttonComponent d-flex align-items-center justify-content-center ${props.typeColor ===
          'blue' && 'buttonComponentBlue'}`}
      >
        {props.loading ? <LoadingSearchComponent /> : props.text}
      </button>
    </>
  )
}
export default React.memo(ButtonComponent)
