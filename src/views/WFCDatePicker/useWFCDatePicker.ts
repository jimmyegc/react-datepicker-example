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
  const [age, setAge] = useState(0);
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
  } = objConf;

  const calendarStartDay = startOfWeek === "Dom" ? 0 : 1; // 0: Domingo 1: Lunes

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

  const handleAgeValidation = (e) => {
    setAge(e.target.value);
    const ageCalc = e.target.value;
    if (ageCalc >= objConf.minAge && ageCalc <= objConf.maxAge) {
      setValidationMessage("");
    } else {
      setValidationMessage(
        `La edad no es válida, mínimo ${objConf.minAge} máximo ${objConf.maxAge}`
      );
    }
  };

  return {
    // General
    objConf,
    options,
    option,
    readOnly,
    dateFormat,
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
    // Past Days
    maxPastDays,
    // Future Days
    maxFutureDays,
  };
};
