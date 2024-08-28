import { useState } from "react";
import { componentsMock } from "../../WFCFormInputDatePicker/componentsMock";

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
  // States
  const [excludeDates, setExcludeDates] = useState<BlockDates[]>([]);
  const [includeDates, setIncludeDates] = useState<BlockDates[]>([]);
  const [age, setAge] = useState(0);
  const [hour, setHour] = useState("00:00");
  const [dateFormat, setDateFormat] = useState("dd/MM/YYYY");

  const [validationMessage, setValidationMessage] = useState("");

  const { objConf } = componentsMock;

  const option =
    objConf.canBlockDays ||
    objConf.isRangeOfAge ||
    objConf.canSelectPastDates ||
    objConf.canSelectFutureDates ||
    objConf.canEnabledDays
      ? options.custom
      : options.default;

  const {
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
  } = objConf;

  const calendarStartDay = startOfWeek === "Dom" ? 0 : 1; // 0: Domingo 1: Lunes
  const timeFormat = formatHour === "24" ? " HH:mm" : "h:mm aa"; // 24 Hrs / 12 Hrs

  const getExcludeDates = () => {
    if (canBlockDays) {
      const blockDates: BlockDates[] = [];
      if (disabledDays.length > 0) {
        disabledDays.forEach((day) => {
          blockDates.push({
            start: new Date(day.rawDate.split("@")[0]),
            end: new Date(day.rawDate.split("@")[1]),
          });
        });
        setExcludeDates(blockDates);
      }
    }
  };

  const getIncludeDates = () => {
    if (canEnabledDays) {
      const enabledDates: BlockDates = [];
      if (enabledDays.length > 0) {
        objConf.enabledDays.forEach((day) => {
          enabledDates.push({
            start: new Date(day.rawDate.split("@")[0]),
            end: new Date(day.rawDate.split("@")[1]),
          });
        });
        setIncludeDates(enabledDates);
      }
    }
  };

  const handleAgeValidation = (e) => {    
    const ageCalc = ageCalculator(e);
    if (ageCalc >= objConf.minAge && ageCalc <= objConf.maxAge) {
      setValidationMessage("");
    } else {
      setValidationMessage(
        `La edad ${ageCalc} no es válida, mínimo ${objConf.minAge} máximo ${objConf.maxAge}`
      );
    }
  };

  const validHHMMstring = (str) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str);

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
    //handleChange(startDate);
  };

  const ageCalculator = (fechaNacimiento: Date) => {    
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();    
    let edad = hoy.getFullYear() - nacimiento.getFullYear();        
    const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();
    const diaDiferencia = hoy.getDate() - nacimiento.getDate();    
    if (mesDiferencia < 0 || (mesDiferencia === 0 && diaDiferencia < 0)) {
        edad--;
    }
    return edad;
}

  return {
    // General
    objConf,
    options,
    option,
    readOnly,
    dateFormat,
    timeFormat,
    calendarStartDay,
    validationMessage,
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
    ageCalculator,
    // Past Days
    maxPastDays,
    // Future Days
    maxFutureDays,
    isEnableCurrentDay,
    hour,
    setHour,
    handleMaxTimeCurrentDay,
    // include Dates or Enabled Dates
    getIncludeDates,
    includeDates,
  };
};
