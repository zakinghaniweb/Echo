import React from 'react'
import './ButtonV1.css'
import { FaPlus } from 'react-icons/fa'

const ButtonV1 = ({buttonV1Click,buttonV1Bg,buttonV1Color,buttonV1Text}) => {
  return (
    <button onClick={buttonV1Click} className={`buttonV1 ${buttonV1Bg} ${buttonV1Color}`}>{buttonV1Text}</button>
  )
}

export default ButtonV1