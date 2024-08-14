import { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns"
import { useWFCDatePicker } from "../useWFCDatePicker";

export const WFCDatePickerFutureDays = () => {
  const { readOnly, calendarStartDay, dateFormat, maxFutureDays } = useWFCDatePicker();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleChange = (dateChange: Date) => {
    setStartDate(dateChange);
  };


  return (<>
    <div>WFCDatePickerFutureDays</div>
    <div className="w-100">
      <DatePicker
        locale="es"
        icon="fa fa-calendar"
        /* className={`form-control form-control-solid w-250px ${c}`} */
        selected={startDate}
        onChange={handleChange}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        readOnly={readOnly}
        calendarStartDay={calendarStartDay}
        /* filterDate={isWeekday} */
        dateFormat={"dd/MM/YYYY"}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        minDate={new Date()}
        maxDate={addDays(
          new Date(),
          Number(maxFutureDays)
        )}
      />
      {/*  {objConf.isEnableCurrentDay && (
        <input
          className="form-control d-inline ms-1"
          style={{ width: 80 }}
          type="text"
          placeholder="00:00"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
      )}
      {validationMaxHour && (
        <>
          <div style={{ marginBottom: ".2rem" }}>
            <Alert
              variant="warning"
              style={{ padding: ".1rem", margin: ".0rem" }}
            >
              {validationMaxHour}
            </Alert>
          </div>
        </>
      )} */}
    </div>

  </>
  )
}
