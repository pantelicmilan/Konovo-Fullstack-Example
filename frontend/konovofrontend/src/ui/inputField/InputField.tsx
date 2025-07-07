import style from './InputField.module.css'

export const InputField = ({placeholder, value, onChange, isPasswordField = false, isWidth100 = false}) => {
  return (
    <>
        <input 
            style= {isWidth100 ? {width: "100%"} : {}}
            className={style.inputField}
            type={isPasswordField ? "password" : "text"} 
            value ={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </>
  )
}
