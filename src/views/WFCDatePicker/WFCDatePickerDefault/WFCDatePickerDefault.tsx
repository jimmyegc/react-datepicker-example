import React, { useEffect, useState } from 'react'
import { useWFCDatePicker } from '../useWFCDatePicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from './Icon';

export const WFCDatePickerDefault = () => {
  
  const { readOnly, dateFormat, shouldCloseOnSelect, calendarStartDay, filterDate, isHourRequired, timeInputLabel, defaultDate, c } = useWFCDatePicker();
  const [startDate, setStartDate] = useState<Date | null>();

  useEffect(()=> {
    if(defaultDate) setStartDate(defaultDate)
  },[defaultDate])
  
  return (<>    
    <div>
      <h2>WFCDatePickerDefault</h2>
      <DatePicker      
        locale="es"
        showIcon
        icon={<Icon/>}        
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
        shouldCloseOnSelect={shouldCloseOnSelect}
      />
    </div>
    </>)
}
