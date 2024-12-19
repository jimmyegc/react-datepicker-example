import { useEffect, useState } from "react";
import { objConf } from "./WFCDatePickerMock";
import { subDays, addDays, getDay } from "date-fns";

enum options {
  "default",
  "custom",
}

interface BlockDates {
  start: Date;
  end: Date;
}

interface ListDays {
  id: string;
  rawDate: string;
  humanDate: string;
  status: "enabled" | "disabled";
}

export const useWFCDatePicker = () => {
  const [defaultDate, setDefaultDate] = useState<Date | null>();
  const [excludeDates, setExcludeDates] = useState<BlockDates[]>([]);
  const [includeDates, setIncludeDates] = useState<BlockDates[]>([]);
  const [age, setAge] = useState(0);
  const [hour, setHour] = useState("00:00");
  const [dateFormat, setDateFormat] = useState<string | undefined>();  
  const [validationMessage, setValidationMessage] = useState("");
  const [shouldCloseOnSelect, setShouldCloseOnSelect] = useState(true)
  const today = new Date();
  const tomorrow = addDays(new Date(), 1);

  const option =
    objConf.canBlockDays ||
    objConf.isRangeOfAge ||
    objConf.canSelectPastDates ||
    objConf.canSelectFutureDates ||
    objConf.canEnabledDays
      ? options.custom
      : options.default;

  const {
    internalName,
    isRequired,
    canBlockDays,
    isRangeOfAge,
    canSelectPastDates,
    canSelectFutureDates,
    canEnabledDays,
    disabledDays,
    readOnly,
    startOfWeek,
    maxPastDays,
    maxFutureDays,
    isEnableCurrentDay,
    maxHourCurrentDay,
    enabledDays,
    formatHour,
    isHourRequired
  } = objConf;

  const calendarStartDay = startOfWeek === "Dom" ? 0 : 1; // 0: Domingo 1: Lunes
  const timeFormat = formatHour === "24" ? " HH:mm" : "h:mm aa"; // 24 Hrs / 12 Hrs
  const timeInputLabel = "Hora";

  // General
  const getFormatDate = () => {
    const cleanFormatDate = objConf.formatDate?.replace(/ /g, objConf.separator) || "";
    const hourFormat = objConf.isHourRequired
      ? objConf.formatHour === "24" ? "HH:mm" : "h:mm aa"
      : "";
      
    return `${cleanFormatDate}${objConf.isHourRequired ? ` ${hourFormat}` : ""}`;
  };
  
  const filterDate = (date) => {
    // Días hábiles de la Semana : isWeekday
    const day = getDay(date);
    return objConf.daysOfWeek.every(
      (dayConfig, index) => day !== (!dayConfig.enabled ? index : -1)
    );
  };

  const getExcludeDates = () => {
    if (!canBlockDays || disabledDays.length === 0) return;
    const blockDates = disabledDays.map(day => {
      const [start, end] = day.rawDate.split("@").map(date => new Date(date));
      return { start, end };
    });  
    setExcludeDates(blockDates);
  };

  const getIncludeDates = () => {
    if (!canEnabledDays || enabledDays.length === 0) return;
    const enabledDates = enabledDays.map(day => {
      const [start, end] = day.rawDate.split("@").map(date => new Date(date));
      return { start, end };
    });
    setIncludeDates(enabledDates);
  };

  // Age Range
  const calculateAge = (birthDate: Date) => {
    const birth = new Date(birthDate);
    const today = new Date();  
    // Calcular la diferencia en años, meses y días
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();  
    // Ajustar años y meses si es necesario
    if (days < 0) {
      months--; // Si los días son negativos, restamos un mes
      // Calculamos los días restantes en el mes anterior
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += previousMonth;
    }  
    if (months < 0) {
      years--; // Si los meses son negativos, restamos un año
      months += 12; // Ajustamos los meses
    }  
    return { years, months, days };
  }

  const isWithinAgeRange = (birthDate: Date, minAge: number, maxAge: number) => {
    const birth = new Date(birthDate);
    const today = new Date();  
    // Fecha mínima permitida (minAge)
    const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());    
    // Fecha máxima permitida (maxAge)
    const maxDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());  
    // Validar si la fecha de nacimiento está dentro del rango
    return birth <= minDate && birth >= maxDate;
  };
  
  const handleAgeValidation = (birthDate: Date) => {    
    if (isWithinAgeRange(birthDate, objConf.minAge, objConf.maxAge)) {      
      setValidationMessage("");      
    } else {
      const ageCalc = calculateAge(birthDate);
      setValidationMessage(
        `La edad (${ageCalc.years} años, ${ageCalc.months} meses y ${ageCalc.days} días) no es válida, mínimo ${objConf.minAge}-${objConf.maxAge} años.`
      );
    }
  };

  const validHHMMstring = (str) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str);

  /*
  const handleMaxTimeCurrentDay = (value) => {
    if (!validHHMMstring(value)) {
      setValidationMessage("Ingrese una hora válida en formato 24 hrs (HH:MM)");
      return false;
    }
    setValidationMessage("");
    if (maxHourCurrentDay) {
      const [maxHour, maxMinutes] = objConf.maxHourCurrentDay.split(":");
      const [currentHour, currentMinutes] = value.split(":");
      if (
        currentHour < maxHour ||
        (currentHour === maxHour && currentMinutes <= maxMinutes)
      ) {
        setValidationMessage("");
      } else {
        setValidationMessage(
          `La ingresada tiene que ser menor a ${maxHour}:${maxMinutes}.`
        );
      }
    }
    handleChange(startDate);
  };
*/  

  const formatUTC = (dateInt, addOffset = false) => {
    const date =
      !dateInt || dateInt.length < 1 ? new Date() : new Date(dateInt);
    if (typeof dateInt === "string") {
      return date;
    } else {
      const offset = addOffset
        ? date.getTimezoneOffset()
        : -date.getTimezoneOffset();
      const offsetDate = new Date();
      offsetDate.setTime(date.getTime() + offset * 60000);
      return offsetDate;
    }
  };

  /*const red = errors[objConf.internalName]?.type ? "required" : "";
  const blue = objConf.isRequired ? "required-default" : "";
  const c = red !== "" ? red : blue; */
  const c = "";

  const handleInitial = () => {
    const initialDate = objConf.defaultDateType === "" || objConf.defaultDateType === undefined
      ? null
      : objConf.defaultDateType === "today" ? new Date() : new Date(objConf.defaultDate);    
    setDefaultDate(initialDate);
    setDateFormat(getFormatDate());
  };

  useEffect(() => {
    handleInitial();
  }, [])


  return {
    // General
    internalName,
    isRequired,
    today,
    tomorrow,
    objConf,
    options,
    option,
    readOnly,
    dateFormat,    
    timeFormat,
    formatHour,
    calendarStartDay,
    defaultDate,
    filterDate,
    validationMessage,
    c,
    isHourRequired,
    timeInputLabel,
    shouldCloseOnSelect,
    setShouldCloseOnSelect,
    validHHMMstring,
    formatUTC,
    // Custom Components
    canBlockDays,
    isRangeOfAge,
    canSelectPastDates,
    canSelectFutureDates,
    canEnabledDays,
    disabledDays,
    // Exclude Dates or BlockDays
    getExcludeDates,
    excludeDates,
    // Range of Age
    age,
    handleAgeValidation,
    calculateAge,
    // Past Days
    maxPastDays,
    // Future Days
    maxFutureDays,
    isEnableCurrentDay,
    maxHourCurrentDay,
    hour,
    setHour,
    // handleMaxTimeCurrentDay, // Removed
    // include Dates or Enabled Dates
    getIncludeDates,
    includeDates,
  };
};
