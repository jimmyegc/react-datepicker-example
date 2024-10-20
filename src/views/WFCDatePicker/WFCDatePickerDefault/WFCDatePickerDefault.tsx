import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { useWFCDatePicker } from '../useWFCDatePicker';
import { CustomInput } from '../components/CustomInput/CustomInput';
import { Icon } from './Icon';

export const WFCDatePickerDefault = () => {
  
  const { formatHour, readOnly, dateFormat, shouldCloseOnSelect, calendarStartDay, filterDate, isHourRequired, timeInputLabel, defaultDate, c, setShouldCloseOnSelect } = useWFCDatePicker();
  const [startDate, setStartDate] = useState();

  useEffect(()=> {
    if(defaultDate) setStartDate(defaultDate)
  },[defaultDate])

  useEffect(() => {
    if(isHourRequired) setShouldCloseOnSelect(false)
  },[])
  
  return (<>    
    <div>
      <h2>WFCDatePickerDefault</h2>
      <DatePicker      
        locale="es"
        showIcon
        /* icon={<Icon/>}       */  
        className={`form-control form-control-solid w-250px ${c}`}        
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        onKeyDown={(e) => e.preventDefault()}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        readOnly={readOnly}
        dateFormat={dateFormat}        
        calendarStartDay={calendarStartDay}        
        filterDate={filterDate}
        timeInputLabel={timeInputLabel}
        showTimeInput={isHourRequired}        
        customTimeInput={
          isHourRequired && formatHour === "24" ? (<CustomInput
            className="form-control"
            onChange={(date) => setStartDate(date)}
          />) : undefined
        }   
        shouldCloseOnSelect={shouldCloseOnSelect}
      />
    </div>
    </>)
}
