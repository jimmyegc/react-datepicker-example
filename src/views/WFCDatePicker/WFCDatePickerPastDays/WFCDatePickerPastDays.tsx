import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useWFCDatePicker } from '../useWFCDatePicker';
import { addDays, subDays } from "date-fns"

export const WFCDatePickerPastDays = () => {

  const { readOnly, startOfWeek, dateFormat, maxPastDays } = useWFCDatePicker();

  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleChange = (dateChange: Date) => {
    setStartDate(dateChange);
  };

  return (<>
    <div>WFCDatePickerPastDays</div>
    <div>
      <DatePicker
        locale="es"
        icon="fa fa-calendar"
        /* className={`form-control form-control-solid w-250px ${c}`} */
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        readOnly={readOnly}
        calendarStartDay={startOfWeek}
        /* filterDate={isWeekday} */
        dateFormat={dateFormat}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        minDate={subDays(new Date(), maxPastDays)}
        maxDate={addDays(new Date(), 0)}
      />
    </div>
  </>

  )
}
