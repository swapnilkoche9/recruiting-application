import { FC } from 'react'
import classNames from 'classnames'
import './info-box.scss'

interface IInfoBoxProps {
  message: string
  variant?: 'error' | 'standard'
}
const InfoBox: FC<IInfoBoxProps> = ({ message, variant = 'standard' }) => {
  const infoMessage = classNames({ standard: variant === 'standard', error: variant === 'error' })

  return <h5 className={infoMessage}>{message}</h5>
}

export default InfoBox
