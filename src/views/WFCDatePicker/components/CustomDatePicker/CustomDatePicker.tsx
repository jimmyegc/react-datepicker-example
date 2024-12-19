import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);

export const CustomDatePicker = ({ ...props }) => {

return (    
  <DatePicker
    locale={es}
    { ...props}
  />    
)
}
