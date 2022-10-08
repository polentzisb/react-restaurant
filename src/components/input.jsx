import React from 'react'


const Input = (props) => {
  const {label, id, type, handleInput} = props
  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <input
         type={type}
         id={id}
         name={id}
         onChange={(e)=>handleInput(e)}
         />
    </div>
  )
}

export default Input