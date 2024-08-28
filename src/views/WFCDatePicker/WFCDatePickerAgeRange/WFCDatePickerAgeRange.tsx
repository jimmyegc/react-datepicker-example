import DatePicker from "react-datepicker";
import { useWFCDatePicker } from "../useWFCDatePicker";
import { useState } from "react";

export const WFCDatePickerAgeRange = () => {
  const [startDate, setStartDate] = useState(new Date())
  const { age, handleAgeValidation, validationMessage, dateFormat, ageCalculator } = useWFCDatePicker()

  const handleChange = (e) => {
    console.log(e)
    setStartDate(e)
    handleAgeValidation(e)
  }

  return (<>
    <div>WFCDatePickerAgeRange</div>
    <div>
      <label>Edad</label>
      {/* <input
        type="number"
        value={age}
        onChange={handleAgeValidation}
      /> */}
       <DatePicker
            locale="es"
            icon="fa fa-calendar"
            /* className={`form-control form-control-solid w-250px ${c}`} */
            selected={startDate}
            onChange={handleChange}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            dateFormat={dateFormat} 
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"            
          />
      {validationMessage && <span>{validationMessage}</span>}
    </div>
  </>)
};
