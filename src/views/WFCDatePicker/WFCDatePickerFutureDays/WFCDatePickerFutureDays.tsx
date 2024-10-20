import { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);

import { addDays, isDate } from "date-fns";
import { useWFCDatePicker } from "../useWFCDatePicker";
import { CustomInput } from "../components/CustomInput/CustomInput";

export const WFCDatePickerFutureDays = () => {  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [minDate, setMinDate] =useState<Date | null>(null);
  
  //const { register, getValues, setValue, watch, control } = useFormContext();    
  const { register, control, setValue } = useForm();

  const {
    internalName,
    isRequired,
    c,    
    readOnly,
    dateFormat,
    calendarStartDay,
    timeInputLabel,
    filterDate,    
    formatHour,
    maxFutureDays,
    canSelectFutureDates,
    isEnableCurrentDay,
    isHourRequired,
    maxHourCurrentDay,
    today,
    tomorrow,    
    //validationMessage,    
  } = useWFCDatePicker();

  const calculateDateWithHour = (hourParam: string) => {  
    // Obtén la fecha actual
    const currentDate = new Date();
    // Divide la hora pasada como parámetro en horas y minutos
    const [hours, minutes] = hourParam.split(":").map(Number);
    // Ajusta la hora y minutos en la fecha actual
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    return currentDate;
  };
  
  const areDatesTheSame = (date1 : Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const calculateFutureDates = (dateChange: Date) => {
    if (
      canSelectFutureDates &&
      isEnableCurrentDay &&
      maxHourCurrentDay != ""
    ) {
      if (!dateChange) return;
      const now = new Date();
      const maxTodayHour = calculateDateWithHour(maxHourCurrentDay);
      if (areDatesTheSame(dateChange, today)) {
        if (now.getTime() < maxTodayHour.getTime()) {
          setMinDate(today);        
          setValue(internalName, now, { shouldDirty: true });
        } else {
          setMinDate(tomorrow);
          setValue(internalName, null, { shouldDirty: true });
        }
      } else {
        setValue(internalName, dateChange, { shouldDirty: true });
      }
      return;
    }
    setMinDate(today);
  };
  
  const handleChange = (dateChange: Date) => {
    calculateFutureDates(dateChange);
    setStartDate(dateChange);
    /*if (canSelectFutureDates && isEnableCurrentDay) {      
      if(hour) {
        const formattedDate = dateChange.toISOString().split("T")[0];
        const dateChangeHour = new Date(`${formattedDate}T${hour}:00`);        
        setStartDate(dateChangeHour);
      }      
    } else {
      setStartDate(dateChange);
    } */
  };

  const handleValidationFutureDays = () => !isRequired || isDate(startDate);
  
  useEffect(() => {
    calculateFutureDates(today)
  },[])

  /*
  useEffect(() => {
    const delayFn = setTimeout(() => {
      setHour(hour);      
      handleMaxTimeCurrentDay(hour);
    }, 350);
    return () => clearTimeout(delayFn);
  }, [hour]); 
  */

return (    
  <div className="w-100">
    <div>WFCDatePickerFutureDays</div>
      <Controller
        name={`${internalName}`}
        control={control}
        defaultValue={startDate}
        rules={{ 
          required: isRequired,
          validate: handleValidationFutureDays,
        }}
        render={({ field: { onChange, onBlur, value, ref, name } }) => (
          <>
          <DatePicker
            ref={(elem) => {
              elem && ref(elem.input);
            }}
            locale="es"
            icon="fa fa-calendar"
            className={`form-control form-control-solid w-250px ${c}`}
            selected={startDate}
            onSelect={handleChange}
            onChange={handleChange}
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
            minDate={minDate}
            maxDate={addDays(today, Number(maxFutureDays))}
            showTimeInput={isHourRequired}
            timeInputLabel={timeInputLabel}
            timeFormat={formatHour}
            shouldCloseOnSelect={false}
            closeOnScroll={true}
            openToDate={new Date("1993/09/28")}
            customTimeInput={
              isHourRequired && formatHour === "24" ? (<CustomInput
                className="form-control"
                onChange={(date) => setStartDate(date)}
              />) : undefined
            }   
          />          
          </>
        )}
      />

        {/* <DatePicker
          locale="es"
          icon="fa fa-calendar"          
          selected={startDate}
          onChange={handleChange}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          readOnly={readOnly}
          calendarStartDay={calendarStartDay}
          filterDate={isWeekday} 
          dateFormat={"dd/MM/YYYY"}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          minDate={new Date()}
          maxDate={addDays(new Date(), Number(maxFutureDays))}
        /> */}
        {/* {isEnableCurrentDay && (
          <input
            className="form-control d-inline ms-1"
            style={{ width: 80 }}
            type="text"
            placeholder="00:00"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        )} */}
       {/*  {validationMessage && (
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
        )} */}
      </div>    
  );
};
