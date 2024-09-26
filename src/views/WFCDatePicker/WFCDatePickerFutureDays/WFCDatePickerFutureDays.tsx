import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useWFCDatePicker } from "../useWFCDatePicker";
import { Alert } from "react-bootstrap";

export const WFCDatePickerFutureDays = () => {
  const {
    readOnly,
    calendarStartDay,
    dateFormat,
    maxFutureDays,
    isEnableCurrentDay,
    hour,
    setHour,
    validationMessage,
    canSelectFutureDates,
    handleMaxTimeCurrentDay,
  } = useWFCDatePicker();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleChange = (dateChange: Date) => {
    if (canSelectFutureDates && isEnableCurrentDay) {      
      if(hour) {
        const formattedDate = dateChange.toISOString().split("T")[0];
        const dateChangeHour = new Date(`${formattedDate}T${hour}:00`);
        /* setValue(objConf?.internalName, dateChangeHour, {
          shouldDirty: true,
        });*/
        setStartDate(dateChangeHour);
      }      
    } else {
      setStartDate(dateChange);
    }
  };

  useEffect(() => {
    const delayFn = setTimeout(() => {
      setHour(hour);
      handleMaxTimeCurrentDay(hour);
    }, 350);
    return () => clearTimeout(delayFn);
  }, [hour]);

  return (
    <>
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
          maxDate={addDays(new Date(), Number(maxFutureDays))}
        />
        {isEnableCurrentDay && (
          <input
            className="form-control d-inline ms-1"
            style={{ width: 80 }}
            type="text"
            placeholder="00:00"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        )}
        {validationMessage && (
          <>
            <div style={{ marginBottom: ".2rem" }}>
              <Alert
                variant="warning"
                style={{ padding: ".1rem", margin: ".0rem" }}
              >
                {validationMessage}
              </Alert>
            </div>
          </>
        )}
      </div>
    </>
  );
};
