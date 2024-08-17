import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import { useWFCDatePicker } from "../useWFCDatePicker";
registerLocale("es", es);

export const WFCDatePickerBlockedDays = () => {
  const { readOnly, calendarStartDay, excludeDates, getExcludeDates } =
    useWFCDatePicker();
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleChange = (dateChange: Date) => {
    setStartDate(dateChange);
  };


  useEffect(() => {
    getExcludeDates()
  }, []);

  return (
    <>
      <div>WFCDatePickerBlockDays</div>
      <DatePicker
        locale="es"
        icon="fa fa-calendar"
        /* className={`form-control form-control-solid w-250px ${c}`} */
        selected={startDate}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        readOnly={readOnly}
        calendarStartDay={calendarStartDay}
        excludeDateIntervals={excludeDates}
      /*       
    //filterDate={isWeekday}
    dateFormat={dateFormat}
    timeFormat={objConf.formatHour == "24" ? " HH:mm" : "h:mm aa"}
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    timeInputLabel="Hora"
    showTimeInput={objConf.isHourRequired}
    //excludeDates={excludeDates}
    excludeDateIntervals={excludeDates}      */
      />
    </>
  );
};
