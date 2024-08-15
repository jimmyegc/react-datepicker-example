import { useEffect, useState } from "react";
import { useWFCDatePicker } from "../useWFCDatePicker";
import DatePicker from "react-datepicker";

export const WFCDatePickerEnabledDays = () => {
  const {
    readonly,
    dateFormat,
    calendarStartDay,
    timeFormat,
    canEnabledDays,
    getIncludeDates,
    includeDates
  } = useWFCDatePicker();

  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleChange = (dateChange: Date) => {
    setStartDate(dateChange);
  };


  useEffect(() => {
    getIncludeDates()
  }, []);


  return (
    <>
      <div>WFCDatePickerEnabledDays</div>
      {canEnabledDays && (
        <>
          <div>Habilitar días</div>
          <DatePicker
            locale="es"
            icon="fa fa-calendar"
            /* className={`form-control form-control-solid w-250px ${c}`} */
            selected={startDate}
            onChange={handleChange}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            readOnly={readonly}
            calendarStartDay={calendarStartDay}
            includeDateIntervals={includeDates}
          /* dateFormat={dateFormat}
          timeFormat={timeFormat}
          timeInputLabel="Hora"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          showTimeInput={isHourRequired}*/

          />
        </>
      )}
    </>
  );
};

/*
locale = "es"
icon = "fa fa-calendar"
selected = { startDate }
onChange = {(e) => handleChange(e)}
onKeyDown = {(e) => {
  e.preventDefault();
}}
readOnly = { readOnly }
calendarStartDay = { calendarStartDay }
excludeDateIntervals = { excludeDates }
  */