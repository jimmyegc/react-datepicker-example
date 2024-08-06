import { useState } from "react";
import DatePicker from "react-datepicker"
import { addDays, subDays } from 'react-datepicker/dist/date_utils.d.ts'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es)

import "react-datepicker/dist/react-datepicker.css";

const dpConfig = {
  "id": "836c41be-09ee-494c-80a8-8af7990947d9",
  "idWfcDB": 3,
  "name": "DateComponent",
  "objConf": {
    "fieldName": "birthday",
    "position": "top",
    "sectionLabel": "texto emergente",
    "guideText": "texto de apoyo",
    "isRequired": true,
    "readOnly": false,
    "separator": "/",
    "startOfWeek": "Lun",
    "isHourRequired": true,
    "formatDate": "dd mm aaaa",
    "formatHour": "24",
    "daysOfWeek": [
      {
        "name": "Lun",
        "enabled": true
      },
      {
        "name": "Mar",
        "enabled": true
      },
      {
        "name": "Mié",
        "enabled": true
      },
      {
        "name": "Jue",
        "enabled": true
      },
      {
        "name": "Vie",
        "enabled": true
      },
      {
        "name": "Sáb",
        "enabled": false
      },
      {
        "name": "Dom",
        "enabled": false
      }
    ],
    "defaultDateType": "today",
    "defaultDate": "",
    "defaultDateValue": "",
    "isRangeOfAge": false,
    "minAge": "",
    "maxAge": null,
    "canSelectPastDates": false,
    "maxPastDays": null,
    "canSelectFutureDates": false,
    "maxFutureDays": null,
    "isEnableCurrentDay": false,
    "enabledDays": [],
    "disabledDays": []
  },
  "objData": [
    { "fieldName": "birthday", "value": "" },
  ],
  "isValidate": false,
  "componentName": "Fecha",
  "column": null,
  "isExternalColumn": true,
  "isDuplicated": false,
  "typeOfComponent": "input"
}


export const Datepicker = () => {

  const { objConf } = dpConfig;
  const [startDate, setStartDate] = useState(new Date());
  const [config, setConfig] = useState(dpConfig)

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const flexDirection = (config.objConf.position === 'top') ? 'column' : 'row'
  const allowedDates = ['2024-08-14', '2020-08-15'];
  /*
    includeDates: Habilitar días
    min y max permite saber en que rango
    exclude dates es bloquear días (disabled dates)
  */

  return (
    <>
      <a href="https://reactdatepicker.com/" target="_blank">React Datepicker</a>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 140 }}
      >
        <div
          style={{ display: 'flex', flexDirection }}
        >
          <span>{config.objConf.fieldName}</span>
          < DatePicker
            locale="es"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            readOnly={config.objConf.readOnly}
            calendarStartDay={config.objConf.startOfWeek === "Lun" ? 1 : 0}
            /* filterDate={isWeekday} */

            includeDates={[new Date(), addDays(new Date(), 1)]}

            minDate={subDays(new Date(), 5)}
            maxDate={addDays(new Date(), 15)}

            excludeDates={[
              { date: new Date(), message: "Today is excluded" },
              { date: subDays(new Date(), 1), message: "This day is excluded" },
            ]}


            /* 
             */

            /* includeDates={[new Date(), addDays(new Date(), 1), addDays(new Date(), 5)]} */

            /* includeDates={[(new Date() + 2), addDays(new Date(), 1)]} */
            /*           */


            placeholderText="Select a date other than today or yesterday"
          />
        </div >
      </div >
      <pre>
        {JSON.stringify(dpConfig, null, 2)}</pre>
    </>
  )
}
