import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useWFCDatePicker } from "../useWFCDatePicker";

export const WFCDatePickerAgeRange = () => {
  const [startDate, setStartDate] = useState<Date | null>()
  const { handleAgeValidation, validationMessage, dateFormat, today, readOnly, calendarStartDay } = useWFCDatePicker()

  const handleChange = (dateChange) => {
    setStartDate(dateChange)
    handleAgeValidation(dateChange)
  }

  return (    
    <div>
      <label>Edad</label>      
      <DatePicker
        locale="es"
        icon="fa fa-calendar"
        /* className={`form-control form-control-solid w-250px ${c}`} */
        selected={startDate}
        onChange={handleChange}          
        onKeyDown={(e) => e.preventDefault()}  
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"            
        readOnly={readOnly}
        dateFormat={dateFormat}
        calendarStartDay={calendarStartDay}        
        timeFormat=""        
        maxDate={today}
      />
      {validationMessage && <span>{validationMessage}</span>}
    </div>
  )
};
