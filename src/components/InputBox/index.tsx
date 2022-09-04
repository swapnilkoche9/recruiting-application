import { FC, InputHTMLAttributes } from 'react'

import './input.scss'

interface IInputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  onValueChange: (value: string) => void
}
const InputBox: FC<IInputBoxProps> = ({ placeholder, onValueChange, ...rest }) => {
  return (
    <input
      {...rest}
      className='input'
      type='search'
      placeholder={placeholder}
      onChange={(e) => onValueChange(e.target.value)}
    />
  )
}

export default InputBox
