import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import './Empty.scss'
import React, { ReactNode } from 'react'

interface Iprops {
  description?: ReactNode | string | number
  image?: ReactNode
  className?: string
}
const Empty = ({ description, image, className }: Iprops) => {
  return (
    <div className={`empty ${className || ''}`}>
      {image ? <div className="empty-image">{image}</div> : <FontAwesomeIcon icon={faDatabase} />}
      {description ? (
        <div className="empty-description">{description}</div>
      ) : (
        <p className="empty-description-default">No data</p>
      )}
    </div>
  )
}
export default React.memo(Empty)
