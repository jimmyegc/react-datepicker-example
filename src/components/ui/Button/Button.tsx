import { motion, MotionStyle } from 'framer-motion';

interface ButtonProps {
  id?: string 
  className?: string 
  type?: "button" | "submit" | "reset" | undefined 
  style?: MotionStyle   
  clickHandler?: () => void
  disabled?: boolean  
  children: string  | JSX.Element
}

export const Button = ({ children, ...props } : ButtonProps) => {

  const { id, className, type, style, clickHandler, disabled } = props  
  const btnDisabled = !disabled ? "btn-enable" : "btn-disabled";

  return (    
    <motion.button 
      id={id}
      className={`${className} ${btnDisabled}`}
      type={type} 
      style={style} 
      onClick={clickHandler}
      disabled={disabled}
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.9 }}   
    >
      {children}
    </motion.button>
  )
}

Button.defaultProps = {
  type: "button",
  disabled: false,
  children: ""
};
