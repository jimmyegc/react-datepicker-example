/*import { useState } from "react";
import { DatepickerRange } from "./DatepickerRange/DatepickerRange";
import { Webform } from "./Webform/Webform";
import { WFCFormInputDatePicker } from "./WFCFormInputDatePicker/WFCFormInputDatePicker";

import { componentsMock } from "./WFCFormInputDatePicker/componentsMock";
import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker"; */

import DatePicker from "react-datepicker";
import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { setHours, setMinutes } from "date-fns";



export const App = () => {
  //const [listDisabledDays, setListDisabledDays] = useState([]);
  //const handleDisabledDaysChange = (e) => setListDisabledDays(e);

  const parseRejectionReasons = (input) => {
    return input.split('\n').map(line => {
      const [id, reason] = line.split(',');
      return { id: parseInt(id.trim()), reason: reason.trim() };
    });
  }

  const input = "1,Motivo de rechazo\n2,Opcion 2\n3,No le interesa";
  const result = parseRejectionReasons(input);
  console.log(result);

  const [startDate, setStartDate] = useState(new Date());
  const [timeIntervals, setTimeIntervals] = useState(15)

  return (
    <>
      <h4>Webform</h4>
      <div className="container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          locale="es"
          showTimeSelect
          timeFormat="p"
          timeIntervals={timeIntervals}
          dateFormat="Pp"
          minTime={setHours(setMinutes(new Date(), 0), 17)}
          maxTime={setHours(setMinutes(new Date(), 30), 20)}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>

      {/*  <div className="container">
        <WFCDatePicker />
      </div> */}
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
