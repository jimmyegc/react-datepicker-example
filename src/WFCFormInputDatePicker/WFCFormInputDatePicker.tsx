import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);

import { WFCFormDatePickerModel } from "./WFCFormDatePickerModel";
import { Alert } from "react-bootstrap";
//import { TRANSLATE_MODULE_UTILS } from "../../../../../config/consts";
//import { usePrefixedTranslation } from "../../../../../hooks/usePrefixedTranslation";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { subDays, addDays, getDay } from "date-fns";
//import { positionFieldName } from "../../helpers/styleHelper";
//import { handleInternalColumn } from "../../helpers/helper";

export const WFCFormInputDatePicker = ({
  onChangeProps,
  objConf,
}: {
  onChangeProps?: (obj: WFCFormDatePickerModel) => object;
  objConf?: WFCFormDatePickerModel;
}) => {
  //const { t: tUtils } = usePrefixedTranslation(TRANSLATE_MODULE_UTILS);
  const internalColumns: { [key: string]: string } = {
    one: "col",
    two: "col-12",
    default: "col",
  };

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm() //useFormContext();

  const { position, column } = (objConf as WFCFormDatePickerModel) || {};
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dateFormat, setDateFormat] = useState("dd/MM/YYYY");
  const [hour, setHour] = useState("00:00");
  const [validationMaxHour, setValidationMaxHour] = useState("");
  const [excludeDates, setExcludeDates] = useState([]);
  const [includeDates, setIncludeDates] = useState([]);
  const [highlightDates, setHighlightDates] = useState([]);
  // "MMMM d, yyyy h:mm aa"
  // "dd-MM-yyyy"
  //"MM-dd-yyyy"
  /*objConf.formatDate
      .replace(" ", objConf.separator)
      .replace(" ", objConf.separator) */ //useState("MMMM d, yyyy h:mm aa");

  const getFormatDate = () => {
    const cleanFormatDate = objConf.formatDate
      .replace(" ", objConf.separator)
      .replace(" ", objConf.separator);
    const hourFormat =
      objConf.isHourRequired && objConf.formatHour == "24"
        ? " HH:mm"
        : "h:mm aa";
    // console.log("cleanFormatDate", cleanFormatDate);
    return objConf.isHourRequired
      ? cleanFormatDate + " " + hourFormat
      : cleanFormatDate;
  };

  const handleInitial = () => {
    const initialDate =
      objConf.defaultDateType === "today"
        ? new Date()
        : new Date(objConf.defaultDate);
    alert(initialDate)
    setStartDate(initialDate);
    setDateFormat(getFormatDate());
  };

  const getDefaultDate = () => {
    switch (objConf.defaultDateType) {
      case "":
        return null;
      case "today":
        return new Date();
      case "custom":
        return new Date(objConf.defaultDate);
      default:
        return undefined;
    }
  };

  const isWeekday = (date) => {
    const day = getDay(date);
    return objConf.daysOfWeek.every(
      (dayConfig, index) => day !== (!dayConfig.enabled ? index : -1)
    );
  };

  const [age, setAge] = useState(0);
  const [validationAge, setValidationAge] = useState("");
  const handleAgeValidation = (e) => {
    setAge(e.target.value);
    const ageCalc = e.target.value;
    if (ageCalc >= objConf.minAge && ageCalc <= objConf.maxAge) {
      setValidationAge("");
    } else {
      setValidationAge(
        `La edad no es válida, mínimo ${objConf.minAge} máximo ${objConf.maxAge}`
      );
    }
  };

  const filterPassedTime = (time) => {
    if (objConf.isEnableCurrentDay) {
      const currentDate = new Date();
      const selectedDate = new Date(time);
      console.log("currentDate", currentDate);
      console.log("selectedDate", selectedDate);

      return currentDate.getTime() < selectedDate.getTime();
    } else {
      return true;
    }
  };

  const validHHMMstring = (str) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str);

  const handleMaxTimeCurrentDay = (value) => {
    if (!validHHMMstring(value)) {
      setValidationMaxHour("Ingrese una hora válida en formato 24 hrs (HH:MM)");
      return false;
    }
    //setHour(value);
    setValidationMaxHour("");
    const [maxHour, maxMinutes] = objConf.maxHourCurrentDay.split(":");
    const [currentHour, currentMinutes] = value.split(":");
    if (
      currentHour < maxHour ||
      (currentHour === maxHour && currentMinutes <= maxMinutes)
    ) {
      setValidationMaxHour("");
    } else {
      setValidationMaxHour(
        `La ingresada tiene que ser menor a ${maxHour}:${maxMinutes}.`
      );
    }

    handleChange(startDate);
  };

  const calculateBlockDays = () => {
    if (objConf.canBlockDays) {
      const blockDates = [];
      if (objConf.disabledDays.length > 0) {
        objConf.disabledDays.forEach((day) => {
          blockDates.push({
            start: new Date(day.rawDate.split("@")[0]),
            end: new Date(day.rawDate.split("@")[1]),
          });
        });
        setExcludeDates(blockDates);
      }
    }
  };

  const calculateEnabledDays = () => {
    if (objConf.canEnabledDays) {
      const enabledDates = [];
      if (objConf.enabledDays.length > 0) {
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

  const handleChange = (dateChange: Date) => {
    setValue(objConf?.internalName, dateChange, {
      shouldDirty: true,
    });
    if (objConf.canSelectFutureDates) {
      const formattedDate = dateChange.toISOString().split("T")[0];
      const dateChangeHour = new Date(`${formattedDate}T${hour}:00`);
      setValue(objConf?.internalName, dateChangeHour, {
        shouldDirty: true,
      });
    } else {
      setStartDate(dateChange);
    }
  };
  //console.log(objConf?.internalName);
  useEffect(() => {
    const delayFn = setTimeout(() => {
      setHour(hour);
      handleMaxTimeCurrentDay(hour);
    }, 350);
    return () => clearTimeout(delayFn);
  }, [hour]);

  useEffect(() => {
    handleInitial();
    calculateBlockDays();
    calculateEnabledDays();
    if (objConf.isRequired) {
      register(`${objConf?.internalName}`, {
        required: "El campo es requerido",
      });
    } else {
      register(`${objConf?.internalName}`);
    }
  }, []);

  const c =
    errors[objConf.internalName]?.type === "required"
      ? "required"
      : "required-default";

  return (
    <>
      <div>
        <b>{objConf.fieldName}</b>
      </div>
      <div className="d-flex justify-content-between row">
        <div
        /* className={`${handleInternalColumn({
          columnType: column,
          columns: internalColumns,
        })}`} */
        >
          {/* <Form.Label>{objConf.fieldName}</Form.Label> */}
          {!objConf.canBlockDays &&
            !objConf.isRangeOfAge &&
            !objConf.canSelectPastDates &&
            !objConf.canSelectFutureDates &&
            !objConf.canEnabledDays && (
              <>
                <Controller
                  name={`${objConf?.internalName}`}
                  control={control}
                  defaultValue={startDate}
                  render={() => (
                    <DatePicker
                      locale="es"
                      icon="fa fa-calendar"
                      className={`form-control form-control-solid ${c}`}
                      selected={startDate}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      readOnly={objConf.readyonly}
                      calendarStartDay={objConf.startOfWeek === "Lun" ? 1 : 0}
                      filterDate={isWeekday}
                      dateFormat={dateFormat}
                      timeInputLabel="Hora"
                      showTimeInput={objConf.isHourRequired}
                      timeFormat={
                        objConf.formatHour === "24" ? " HH:mm" : "h:mm aa"
                      }
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  )}
                />
              </>
            )}
          {/* Bloqueo de días */}
          {objConf.canBlockDays && (
            <>
              {/* <div>Bloqueo de días</div> */}
              <DatePicker
                locale="es"
                icon="fa fa-calendar"
                className={`form-control form-control-solid w-250px ${c}`}
                selected={startDate}
                onChange={handleChange}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                readOnly={objConf.readyonly}
                calendarStartDay={objConf.startOfWeek === "Lun" ? 1 : 0}
                //filterDate={isWeekday}
                dateFormat={dateFormat}
                timeFormat={objConf.formatHour == "24" ? " HH:mm" : "h:mm aa"}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                timeInputLabel="Hora"
                showTimeInput={objConf.isHourRequired}
                //excludeDates={excludeDates}
                excludeDateIntervals={excludeDates}
                highlightDates={highlightDates}
              />
            </>
          )}
          {/* Rango de Edad */}
          {objConf.isRangeOfAge && (
            <div>
              <label>Edad</label>
              <input type="number" value={age} onChange={handleAgeValidation} />
              {validationAge && <span>{validationAge}</span>}
            </div>
          )}
          {/* Fechas Pasadas */}
          {objConf.canSelectPastDates && (
            <div>
              <DatePicker
                locale="es"
                icon="fa fa-calendar"
                className={`form-control form-control-solid w-250px ${c}`}
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                readOnly={objConf.readyonly}
                calendarStartDay={objConf.startOfWeek === "Lun" ? 1 : 0}
                filterDate={isWeekday}
                dateFormat={dateFormat}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                minDate={
                  objConf.canSelectPastDates
                    ? subDays(new Date(), objConf.maxPastDays)
                    : null
                }
                maxDate={addDays(new Date(), 1)}
              />
            </div>
          )}
          {/* Fechas Futuras */}
          {objConf.canSelectFutureDates && (
            <div className="w-100">
              <DatePicker
                locale="es"
                icon="fa fa-calendar"
                className={`form-control form-control-solid w-250px ${c}`}
                selected={startDate}
                onChange={handleChange}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                readOnly={objConf.readyonly}
                calendarStartDay={objConf.startOfWeek === "Lun" ? 1 : 0}
                filterDate={isWeekday}
                dateFormat={dateFormat.substring(0, 10)}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={
                  objConf.canSelectFutureDates
                    ? addDays(new Date(), objConf.maxPastDays)
                    : null
                }
              />
              {objConf.isEnableCurrentDay && (
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
              )}
            </div>
          )}
          {/* Habilitar días */}
          {objConf.canEnabledDays && (
            <>
              <div>Habilitar días</div>
              <DatePicker
                locale="es"
                icon="fa fa-calendar"
                className={`form-control form-control-solid w-250px ${c}`}
                selected={startDate}
                onChange={handleChange}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                readOnly={objConf.readyonly}
                calendarStartDay={objConf.startOfWeek === "Lun" ? 1 : 0}
                dateFormat={dateFormat}
                timeFormat={objConf.formatHour == "24" ? " HH:mm" : "h:mm aa"}
                timeInputLabel="Hora"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                showTimeInput={objConf.isHourRequired}
                includeDateIntervals={includeDates}
              />
            </>
          )}
          <div>
            {errors[objConf.internalName] &&
              errors[objConf.internalName].type === "required" && (
                <>
                  <div style={{ marginBottom: ".2rem" }}>
                    <Alert
                      variant="warning"
                      style={{ padding: ".1rem", margin: ".0rem" }}
                    >
                      {tUtils("required-field")}
                    </Alert>
                  </div>
                </>
              )}
          </div>
          {/* Texto de Apoyo */}
          {objConf.guideText && (
            <div className="col-12">
              <figcaption className="figure-caption ms-1">
                {objConf.guideText}
              </figcaption>
            </div>
          )}
          <hr />
          <p>block days: {JSON.stringify(objConf.canBlockDays)}</p>
          <p>edad: {JSON.stringify(objConf.isRangeOfAge)}</p>
          <p>past days: {JSON.stringify(objConf.canSelectPastDates)} </p>
          <p>future days: {JSON.stringify(objConf.canSelectFutureDates)}</p>
          <p>enabled days: {JSON.stringify(objConf.canEnabledDays)}</p>
          {/* <p>{objConf.formatHour === "24" ? " HH:mm" : "h:mm aa"}</p> */}
          {/* <hr />
        <p>{objConf.guideText}</p>       
          */}
          <pre>{JSON.stringify(objConf, null, 2)}</pre>
        </div>
      </div>

      <div className="row">
        <div
        /* className={`col d-flex ${positionFieldName[position] || positionFieldName.default
          }`} */
        >
          <div
            className="d-flex align-items-center me-2"
            style={{ minWidth: "fit-content" }}
          ></div>
          <div className="w-100">
            <div className="row">
              <div className={`${column === "two" ? "col-12" : "col-4"}`}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
