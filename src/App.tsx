/*import { useState } from "react";
import { DatepickerRange } from "./DatepickerRange/DatepickerRange";
import { Webform } from "./Webform/Webform";
import { WFCFormInputDatePicker } from "./WFCFormInputDatePicker/WFCFormInputDatePicker";
import { componentsMock } from "./WFCFormInputDatePicker/componentsMock";
import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker"; */
/*
import DatePicker from "react-datepicker";
import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker";

import { useState } from "react";

*/
/*import { useState } from "react";
import DatePicker from "react-datepicker";

import { subDays, addDays} from "date-fns";
import './styleAgenda.css'
import { Button } from "./components/ui"; */
//import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker";

import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const convertUTCToLocalDate = (date) => {
  if (!date) {
    return date
  }
  date = new Date(date)
  date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return date
}

const convertLocalToUTCDate = (date) => {
  if (!date) {
    return date
  }
  date = new Date(date)
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return date
}


export const App = () => {
  
  const [startDate, setStartDate] =  useState(new Date());
  
  /* const dateChanged = (date) => {
    const UTCDateTime = moment(date).tz("UTC").format("YYYY-MM-DD[T]HH:mm:ss");
    setSelectedDate(moment.tz(UTCDateTime, currentZone));
};
 */
  return (
    <>
      <h4>Webform</h4>            
       <div className="container">
        <pre>
        {JSON.stringify(startDate.toLocaleString())}
        </pre>
       <DatePicker      
           selected={startDate}
           onChange={(date) => setStartDate(date)}
           showTimeSelect
           timeFormat="HH:mm"
           timeIntervals={15}
           timeCaption="time"
           dateFormat="MMMM d, yyyy h:mm aa"
        />
        {/*  <WFCDatePicker /> */}
      </div> 
      {/*  <WFCFormInputDatePicker
      onChangeProps={{}}
      objConf={componentsMock.objConf}
    /> */}
      {/* <Webform /> */}
      {/* <DatepickerRange
      title="Bloqueo de días:"
      status="disabled"
      list={listDisabledDays}
      onListChange={handleDisabledDaysChange}
    /> */}
    </>
  );
};

export default App;
